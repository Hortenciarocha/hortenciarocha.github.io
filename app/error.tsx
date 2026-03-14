'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Oops!</h1>
          <p className="text-muted-foreground">
            Algo deu errado. Por favor, tente novamente.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={() => reset()}>Tentar Novamente</Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Voltar ao Início
          </Button>
        </div>
      </div>
    </main>
  )
}
