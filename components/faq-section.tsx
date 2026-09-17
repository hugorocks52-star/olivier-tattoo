import Link from 'next/link'
import { Accordion } from '@heroui/react'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { Reveal } from '@/components/motion/reveal'

const faqs = [
  {
    question: 'Comment se déroule une première prise de contact ?',
    answer:
      "Vous remplissez le formulaire de demande de rendez-vous en décrivant votre projet (style, zone du corps, taille, inspirations). Olivier vous recontacte ensuite pour échanger sur votre idée et convenir d'un rendez-vous selon vos disponibilités. L'envoi du formulaire ne constitue pas une confirmation de rendez-vous.",
  },
  {
    question: 'Puis-je passer directement au studio sans rendez-vous ?',
    answer:
      "Oui, vous pouvez passer au studio pour un premier contact. Le style, l'emplacement, le tracé et le sujet d'un tatouage nécessitent réflexion — Olivier prend le temps d'échanger sur vos idées avant de matérialiser votre projet.",
  },
  {
    question: "Comment envoyer des images de référence pour mon projet ?",
    answer:
      'Le formulaire de demande permet de joindre jusqu\'à cinq images de référence (inspirations, croquis, ou aperçu réalisé avec notre outil d\'essayage virtuel).',
  },
  {
    question: "Quelles sont les conditions d'hygiène au studio ?",
    answer:
      'Tattoo Lounge utilise du matériel à usage unique et applique des protocoles d\'hygiène stricts à chaque séance — la sécurité des clients est une priorité à chaque étape.',
  },
  {
    question: 'Le studio réalise-t-il des covers ?',
    answer:
      "Oui, la transformation de tatouages existants (covers) est l'une des spécialités du studio, aux côtés du réalisme, du fineline, du noir & gris, de la couleur et du piercing.",
  },
  {
    question: 'Quels sont les horaires du studio ?',
    answer: `Le studio est ouvert du lundi au samedi de 10 h à 19 h, et fermé le dimanche. Vous pouvez aussi appeler directement le ${siteConfig.phoneDisplay}.`,
  },
]

export function FaqSection() {
  return (
    <Reveal className="max-w-3xl mx-auto">
    <Accordion className="space-y-3">
      {faqs.map((faq, index) => (
        <Accordion.Item key={faq.question} id={`faq-${index}`} className="border border-border">
          <Accordion.Heading>
            <Accordion.Trigger className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
              <span className="font-serif text-base sm:text-lg text-foreground">{faq.question}</span>
              <Accordion.Indicator>
                <ChevronDown size={18} className="text-gold" aria-hidden="true" />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed">
              {faq.answer}
            </Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
      <p className="text-center text-muted-foreground text-sm mt-8">
        Une autre question ?{' '}
        <Link href="/contact" className="text-gold hover:underline">
          Contactez le studio
        </Link>
        .
      </p>
    </Reveal>
  )
}
