import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/site-config'

export const runtime = 'nodejs'

interface ContactPayload {
  prenom: string
  nom?: string
  email: string
  telephone?: string
  typeProjet: string
  style?: string
  zone?: string
  taille?: string
  description: string
  budget?: string
  periode?: string
  refImages?: string[]
  /** Honeypot field — real visitors never fill this in. */
  website?: string
}

const REQUIRED_FIELDS: (keyof ContactPayload)[] = ['prenom', 'email', 'typeProjet', 'description']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Best-effort in-memory rate limit. Serverless instances aren't shared, so this
// only helps within a warm instance — the honeypot field is the primary spam guard.
const RATE_LIMIT_WINDOW_MS = 60_000
const lastSubmissionByIp = new Map<string, number>()

function formatSubmission(body: ContactPayload) {
  return [
    `Nouvelle demande via ${siteConfig.name} — ${siteConfig.url}/rendez-vous`,
    '',
    `Nom : ${body.prenom} ${body.nom ?? ''}`.trim(),
    `E-mail : ${body.email}`,
    body.telephone ? `Téléphone : ${body.telephone}` : null,
    '',
    `Type de projet : ${body.typeProjet}`,
    body.style ? `Style : ${body.style}` : null,
    body.zone ? `Zone : ${body.zone}` : null,
    body.taille ? `Taille : ${body.taille}` : null,
    body.budget ? `Budget : ${body.budget}` : null,
    body.periode ? `Période souhaitée : ${body.periode}` : null,
    '',
    'Description du projet :',
    body.description,
  ]
    .filter((line): line is string => line !== null)
    .join('\n')
}

export async function POST(request: Request) {
  let body: ContactPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  }

  // Honeypot: bots fill every field, including this hidden one. Pretend success.
  if (body.website) {
    return NextResponse.json({ ok: true })
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || typeof body[field] !== 'string' || !(body[field] as string).trim()) {
      return NextResponse.json({ error: `missing_field:${field}` }, { status: 400 })
    }
  }
  if (!EMAIL_RE.test(body.email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const last = lastSubmissionByIp.get(ip)
  if (last && now - last < RATE_LIMIT_WINDOW_MS) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }
  lastSubmissionByIp.set(ip, now)

  const recipient = process.env.CONTACT_RECIPIENT_EMAIL
  const apiKey = process.env.RESEND_API_KEY

  if (!recipient || !apiKey) {
    // Not configured yet: log so the request isn't silently lost during setup,
    // but don't fail the visitor's submission over an ops configuration gap.
    console.warn(
      '[contact] CONTACT_RECIPIENT_EMAIL / RESEND_API_KEY not set — submission logged only:\n',
      formatSubmission(body)
    )
    return NextResponse.json({ ok: true, delivered: false })
  }

  try {
    const attachments = (body.refImages ?? []).slice(0, 3).flatMap((dataUrl, i) => {
      const match = /^data:(image\/\w+);base64,(.+)$/.exec(dataUrl)
      if (!match) return []
      const [, mime, content] = match
      return [{ filename: `reference-${i + 1}.${mime.split('/')[1] ?? 'png'}`, content }]
    })

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${siteConfig.name} <onboarding@resend.dev>`,
        to: recipient,
        reply_to: body.email,
        subject: `Nouvelle demande de rendez-vous — ${body.prenom}`,
        text: formatSubmission(body),
        attachments: attachments.length > 0 ? attachments : undefined,
      }),
    })

    if (!res.ok) {
      console.error('[contact] Resend API error', res.status, await res.text())
      return NextResponse.json({ error: 'email_failed' }, { status: 502 })
    }
  } catch (err) {
    console.error('[contact] email dispatch failed', err)
    return NextResponse.json({ error: 'email_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, delivered: true })
}
