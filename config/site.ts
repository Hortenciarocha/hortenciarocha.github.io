export const siteConfig = {
  name: 'SaaS Platform',
  description: 'Plataforma SaaS escalável com arquitetura profissional',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og.jpg',
  links: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
}

export type SiteConfig = typeof siteConfig

export const links = {
  docs: '/docs',
  pricing: '/pricing',
  blog: '/blog',
  help: '/help',
}

export const mainNav = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Docs',
    href: '/docs',
  },
]
