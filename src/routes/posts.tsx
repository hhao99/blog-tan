import { createFileRoute, Link, Outlet } from '@tanstack/react-router';
import { getAllPosts } from '~/lib/posts';

export const Route = createFileRoute('/posts')({

  loader: async ()=> await getAllPosts(),
  component: PostComponent,
})

function PostComponent() {
 const posts = Route.useLoaderData();
  return (
    <main className="flex mt-2 border-1 border-gray-100 flex-row justify-between">
      <div className='flex flex-col bg-bray-200 h-4/5 w-1/5 '>
        <h1 className='text-xl text-blue-600 text-center'>Post Index</h1>
        <div className='flex gap-2 p-2'>
          <ul className='list-disc pl-4'>
          {posts.map( (post)=> (
            <li key={`post-${post.id}`} className='border-b border-gray-400'>
            <Link to="/posts/$id" 
              params={{
                id: String(post.id)
              }}
              className='block py-2 text-gray-800 hover:bg-gray-300 hover:opacity-80'
              activeProps={{ className: 'font-bold underline' }}
            >{post.frontmatter.title || 'Untitled'}</Link>
          </li>))}
          </ul>
        </div>
      </div>
      <div className='container w-3/4'>
        <Outlet />
      </div>

    </main>
  )
}