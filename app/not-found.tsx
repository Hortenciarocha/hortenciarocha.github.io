import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold">404</h1>
          <p className="text-muted-foreground">
            Página não encontrada
          </p>
        </div>
        <Link href="/">
          <Button>Voltar ao Início</Button>
        </Link>
      </div>
    </main>
  )
}
