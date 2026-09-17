import { siteConfig } from '@/lib/site-config'

/** Shared LocalBusiness JSON-LD, reused on every page via app/layout.tsx. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    '@id': `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: siteConfig.hours
      .filter((h) => h.hours !== 'Fermé')
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.schemaDay,
        opens: '10:00',
        closes: '19:00',
      })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteConfig.rating.value,
      reviewCount: siteConfig.rating.count,
    },
    employee: {
      '@type': 'Person',
      name: siteConfig.artist,
      jobTitle: 'Tatoueur',
    },
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: 'fr-FR',
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}
