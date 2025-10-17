import { createFileRoute,redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: ()=> {}
})

function RouteComponent() {
  return (
    <main>
      <h1>Tanstack/start blog example!</h1>
    </main>
  )
}