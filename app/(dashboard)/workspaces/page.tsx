import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { WorkspaceList } from '@/components/workspace/workspace-list'

export const metadata = {
  title: 'Workspaces',
  description: 'Gerencie seus workspaces',
}

export default async function WorkspacesPage() {
  const session = await auth()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Workspaces</h1>
        <p className="text-muted-foreground">
          Gerencie seus workspaces e membros
        </p>
      </div>

      <WorkspaceList />
    </div>
  )
}
