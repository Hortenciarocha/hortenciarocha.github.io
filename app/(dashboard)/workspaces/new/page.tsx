import { CreateWorkspaceForm } from '@/components/workspace/create-workspace-form'

export const metadata = {
  title: 'Novo Workspace',
  description: 'Criar um novo workspace',
}

export default function CreateWorkspacePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Novo Workspace</h1>
        <p className="text-muted-foreground">
          Crie um novo espaço de trabalho para sua equipe
        </p>
      </div>

      <CreateWorkspaceForm />
    </div>
  )
}
