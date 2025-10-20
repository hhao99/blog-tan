import { createFileRoute } from '@tanstack/react-router'
import { Remark } from 'react-remark';
import { getPostById } from "~/lib/posts";

export const Route = createFileRoute('/posts/$id')({
    loader: async ({params: {id}})=> {
      console.log('loading the post with id: ', id)
      return await getPostById({data: {id: parseInt(id)}});
    },
  component: PostComponent,
})

function PostComponent() {
    const post = Route.useLoaderData();
  return (
    <div className='prose w-full h-3/4 mx-auto my-8 p-4 border-2 border-gray-300'>
      <h1 className='text-3xl text-blue-600 border-b-2 border-gray-300'>{post.frontmatter.title || 'Untitled'}</h1>
      <Remark>{post.content}</Remark>
    </div>
  )
}
