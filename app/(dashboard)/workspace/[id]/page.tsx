import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { workspaceService } from '@/services/workspace-service'
import { MemberList } from '@/components/workspace/member-list'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type PageParams = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageParams) {
  const workspace = await workspaceService.getWorkspace(params.id)
  return {
    title: workspace.name,
    description: workspace.description,
  }
}

export default async function WorkspacePage({ params }: PageParams) {
  const session = await auth()

  if (!session) {
    redirect('/auth/login')
  }

  const workspace = await workspaceService.getWorkspace(params.id)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{workspace.name}</h1>
        {workspace.description && (
          <p className="text-muted-foreground">{workspace.description}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Informações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Slug</p>
              <p className="font-mono text-sm">{workspace.slug}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Criado em</p>
              <p className="text-sm">
                {new Date(workspace.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <MemberList workspaceId={params.id} />
        </div>
      </div>
    </div>
  )
}
