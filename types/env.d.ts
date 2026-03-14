/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      STRIPE_SECRET_KEY?: string
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string
      NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

export {}
