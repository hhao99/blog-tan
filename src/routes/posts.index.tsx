import { createFileRoute, Outlet } from '@tanstack/react-router'
import { getAllPosts } from '~/lib/posts';
export const Route = createFileRoute('/posts/')({
  loader: ()=> getAllPosts().then(data=> data),
  component: PostComponent,
})

function PostComponent() {
  return (
    <main>
      <h1>Select a Post to view the summary...</h1>
    </main>
  )
}