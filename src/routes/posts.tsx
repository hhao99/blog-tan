import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/posts')({
  component: PostComponent,
})

function PostComponent() {
  return (
    <main>
      <h1>Hello Post!</h1>
    </main>
  )
}