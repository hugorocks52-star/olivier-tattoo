/**
 * Single source of truth for Tattoo Lounge's real-world business facts.
 * Every page, the JSON-LD schema, the sitemap, and the footer read from here
 * so the same address/phone/hours never drift out of sync across routes.
 */

export const siteConfig = {
  name: 'Tattoo Lounge',
  tagline: 'Salon de tatouage & piercing à Auvers-sur-Oise',
  url: 'https://tattoolounge-olivier.fr',
  artist: 'Olivier',
  description:
    'Tattoo Lounge, salon de tatouage et piercing à Auvers-sur-Oise. Réalisations personnalisées, covers, réalisme et fineline par Olivier. Note 4,7/5 sur 217 avis Google.',
  phone: '+33161031229',
  phoneDisplay: '01 61 03 12 29',
  // No public studio email address is published on the current site — the
  // booking/contact forms are the primary digital contact channel instead.
  // Set CONTACT_RECIPIENT_EMAIL in the environment to enable email delivery.
  address: {
    street: '37 rue du Général-de-Gaulle',
    city: 'Auvers-sur-Oise',
    postalCode: '95430',
    region: "Val-d'Oise",
    country: 'FR',
  },
  geo: {
    latitude: 49.0766,
    longitude: 2.172,
  },
  hours: [
    { day: 'Lundi', schemaDay: 'Monday', hours: '10 h – 19 h' },
    { day: 'Mardi', schemaDay: 'Tuesday', hours: '10 h – 19 h' },
    { day: 'Mercredi', schemaDay: 'Wednesday', hours: '10 h – 19 h' },
    { day: 'Jeudi', schemaDay: 'Thursday', hours: '10 h – 19 h' },
    { day: 'Vendredi', schemaDay: 'Friday', hours: '10 h – 19 h' },
    { day: 'Samedi', schemaDay: 'Saturday', hours: '10 h – 19 h' },
    { day: 'Dimanche', schemaDay: 'Sunday', hours: 'Fermé' },
  ],
  rating: {
    value: 4.7,
    count: 217,
    provider: 'Google',
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    googleReviews: 'https://maps.app.goo.gl/EnfAfA6CukYU2opB8',
  },
  mapsQuery: 'https://maps.google.com/maps?q=37+rue+du+Général-de-Gaulle+95430+Auvers-sur-Oise',
} as const

export const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/studio', label: 'Le studio' },
  { href: '/essai-virtuel', label: 'Essayage virtuel' },
  { href: '/avis', label: 'Avis' },
  { href: '/contact', label: 'Contact' },
] as const

export const footerLegalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
] as const
