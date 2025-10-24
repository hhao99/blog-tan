import { createFileRoute } from '@tanstack/react-router'
import { Remark } from 'react-remark';
import { getPostById } from "~/lib/posts";

export const Route = createFileRoute('/posts/$id')({
  loader: async ({params: {id}})=> await getPostById({data: {id: parseInt(id)}}),
  component: PostComponent,
})

function PostComponent() {
    const post = Route.useLoaderData();
  return (
    <div className='prose w-fullmx-auto my-8 p-4'>
      <h1 className='text-lg text-blue-800 border-b-2 border-gray-300'>{post.frontmatter.title || 'Untitled'}</h1>
      <Remark>{post.content}</Remark>
    </div>
  )
}
