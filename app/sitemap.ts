import type { MetadataRoute } from 'next'
import { CATALOG } from '@/lib/calculators/catalog'
import { canonical } from '@/lib/seo'

// Servido em /normato/sitemap.xml (enviar esse endereço no Google Search Console)
export default function sitemap(): MetadataRoute.Sitemap {
  const atualizado = new Date('2026-10-21')
  return [
    { url: canonical('/'), lastModified: atualizado, changeFrequency: 'weekly', priority: 1 },
    ...CATALOG.map((c) => ({ url: canonical(`/calculadoras/${c.slug}`), lastModified: atualizado, changeFrequency: 'monthly' as const, priority: 0.9 })),
    { url: canonical('/precos'), lastModified: atualizado, changeFrequency: 'monthly', priority: 0.7 },
    { url: canonical('/termos'), lastModified: atualizado, changeFrequency: 'yearly', priority: 0.2 },
    { url: canonical('/privacidade'), lastModified: atualizado, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
