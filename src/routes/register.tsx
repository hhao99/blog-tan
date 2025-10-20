import { createFileRoute } from '@tanstack/react-router'
import { Login } from '~/components/auth/login'
export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Login action='signup' />
}
