import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { WorkspaceSwitcher } from '@/components/workspace/workspace-switcher'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">SaaS Platform</h1>
          <div className="flex items-center gap-4">
            <WorkspaceSwitcher />
            <span className="text-sm text-muted-foreground">
              {session.user?.email}
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        {children}
      </main>
    </div>
  )
}
