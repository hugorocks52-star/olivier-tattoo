export const siteConfig = {
  name: 'Tattoo Lounge',
  tagline: 'Salon de tatouage & piercing à Auvers-sur-Oise',
  url: 'https://tattoolounge-olivier.fr',
  artist: 'Olivier',
  description: 'Tattoo Lounge, salon de tatouage et piercing à Auvers-sur-Oise. Créations personnalisées, covers, réalisme et fineline par Olivier.',
  phone: '+33161031229',
  phoneDisplay: '01 61 03 12 29',
  address: {
    street: '37 rue du Général-de-Gaulle',
    city: 'Auvers-sur-Oise',
    postalCode: '95430',
    region: "Val-d'Oise",
    country: 'France',
  },
  geo: { latitude: 49.0766, longitude: 2.172 },
  hours: [
    { day: 'Lundi', schemaDay: 'Monday', hours: '10 h – 19 h' },
    { day: 'Mardi', schemaDay: 'Tuesday', hours: '10 h – 19 h' },
    { day: 'Mercredi', schemaDay: 'Wednesday', hours: '10 h – 19 h' },
    { day: 'Jeudi', schemaDay: 'Thursday', hours: '10 h – 19 h' },
    { day: 'Vendredi', schemaDay: 'Friday', hours: '10 h – 19 h' },
    { day: 'Samedi', schemaDay: 'Saturday', hours: '10 h – 19 h' },
    { day: 'Dimanche', schemaDay: 'Sunday', hours: 'Fermé' },
  ],
  rating: { value: 4.7, count: 217, provider: 'Google' },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    googleReviews: 'https://maps.app.goo.gl/EnfAfA6CukYU2opB8',
  },
  mapsQuery: 'https://maps.google.com/maps?q=37+rue+du+G%C3%A9n%C3%A9ral-de-Gaulle+95430+Auvers-sur-Oise',
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
  { href: '/politique-de-confidentialite', label: 'Confidentialité' },
] as const
