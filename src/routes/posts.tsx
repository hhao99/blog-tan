import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { getAllPosts } from '~/lib/posts';
export const Route = createFileRoute('/posts')({

  loader: ()=> getAllPosts().then(data=> data),
  component: PostComponent,
})

function PostComponent() {
 const posts = Route.useLoaderData();
  return (
    <main className="flex mt-2 border-t-1 border-blue-800 flex-row justify-between">
      <div className='flex bg-bray-200 h-80vh w-1/3 border-r-1 border-gray-800'>
        <h1>Post Index</h1>
        <div>
          {posts.map( (post,index)=> (<div>
            <Link to="/posts/$id" 
              params={{
                id: String(post.id)
              }}
              key={`post-${index}`}
            >{post.title}</Link>
          </div>))}
        </div>
      </div>
      <div className='container w-2/3'>
        <Outlet />
      </div>

    </main>
  )
}