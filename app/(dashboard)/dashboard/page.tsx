import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/login')
  }

  // Get user's workspaces count
  const workspacesCount = await db.workspaceMember.count({
    where: { userId: session.user?.id },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {session.user?.name || session.user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">Workspaces</h3>
          <p className="text-2xl font-bold">{workspacesCount}</p>
          <p className="text-sm text-muted-foreground">Workspaces ativos</p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">Status</h3>
          <p className="text-2xl font-bold">Ativo</p>
          <p className="text-sm text-muted-foreground">Sua conta</p>
        </div>

        <div className="p-6 rounded-lg border bg-card">
          <h3 className="font-semibold mb-2">Plano</h3>
          <p className="text-2xl font-bold">Free</p>
          <p className="text-sm text-muted-foreground">Seu plano atual</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dashboard/workspaces">
            <div className="p-6 rounded-lg border bg-card hover:border-primary transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">Meus Workspaces</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Acesse e gerencie seus workspaces
              </p>
              <Button size="sm" variant="outline">Ver mais →</Button>
            </div>
          </Link>

          <Link href="/dashboard/workspaces/new">
            <div className="p-6 rounded-lg border bg-card hover:border-primary transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">Novo Workspace</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Crie um novo workspace para sua equipe
              </p>
              <Button size="sm" variant="outline">Criar →</Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
