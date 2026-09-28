import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { siteConfig } from '@/lib/site-config'
import { Reveal } from '@/components/motion/reveal'

const faqs = [
  { question: 'Comment se déroule une première prise de contact ?', answer: "Décrivez votre idée, le style, la zone et les dimensions dans le formulaire. Olivier vous recontacte ensuite pour échanger sur le projet et convenir d'un rendez-vous." },
  { question: 'Puis-je venir au studio sans rendez-vous ?', answer: "Oui, vous pouvez passer pour un premier contact. Pour une consultation complète ou une séance, prendre rendez-vous permet de vous consacrer le temps nécessaire." },
  { question: 'Comment envoyer des images de référence ?', answer: "Le formulaire de rendez-vous permet de joindre jusqu'à cinq images d'inspiration, croquis ou aperçus créés avec l'outil d'essayage virtuel." },
  { question: "Quelles sont les conditions d'hygiène ?", answer: "Le matériel sensible est à usage unique et l'environnement est désinfecté selon un protocole professionnel rigoureux." },
  { question: 'Le studio réalise-t-il des covers ?', answer: "Oui, les covers et transformations de tatouages existants font partie des spécialités du studio. La faisabilité est confirmée après examen du tatouage et de la peau." },
  { question: 'Quels sont les horaires du studio ?', answer: `Le studio est ouvert du lundi au samedi de 10 h à 19 h et fermé le dimanche. Vous pouvez nous joindre au ${siteConfig.phoneDisplay}.` },
]

export function FaqSection() {
  return <Reveal className="mx-auto max-w-3xl"><Accordion type="single" collapsible className="space-y-3">{faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`} className="rounded-2xl border border-white/10 bg-card/45 px-5 data-[state=open]:border-primary/25 data-[state=open]:bg-card/80"><AccordionTrigger className="py-5 text-left text-base font-bold hover:no-underline sm:text-lg">{faq.question}</AccordionTrigger><AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion><p className="mt-8 text-center text-sm text-muted-foreground">Une autre question ? <Link href="/contact" className="text-primary hover:underline">Contactez le studio</Link>.</p></Reveal>
}
