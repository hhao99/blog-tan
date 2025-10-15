import { createFileRoute } from '@tanstack/react-router'
import { getPostById } from "~/lib/posts";
export const Route = createFileRoute('/posts/$id')({
    loader: async ({params: {id}})=> {
      console.log(id)
      return await getPostById({id: parseInt(id)})
    },
  component: PostComponent,
})

function PostComponent() {
    const post = Route.useLoaderData();
    console.log(post)
  return (
    <div>
      <h1 className='text-3xl text-blue-600'>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
