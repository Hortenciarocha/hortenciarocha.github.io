import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tighter text-foreground sm:text-6xl">
            SaaS Platform
          </h1>
          <p className="text-xl text-muted-foreground">
            Uma plataforma SaaS escalável e profissional, construída com as melhores tecnologias
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <Button size="lg" variant="default">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="lg" variant="outline">
              Registrar
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {[
            {
              title: 'Escalável',
              description: 'Arquitetura pronta para crescimento exponencial',
            },
            {
              title: 'Segura',
              description: 'Multi-tenancy com isolamento completo de dados',
            },
            {
              title: 'Profissional',
              description: 'Padrões de código e best practices',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-border bg-card"
            >
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
