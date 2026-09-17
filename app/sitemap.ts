import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/studio', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/essai-virtuel', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/avis', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/rendez-vous', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/mentions-legales', priority: 0.1, changeFrequency: 'yearly' },
  { path: '/politique-de-confidentialite', priority: 0.1, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
