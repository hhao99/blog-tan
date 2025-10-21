import { useRef, useState, useActionState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { createPost } from '~/lib/posts';
import { fetchUser } from '../_authd';


export const Route = createFileRoute('/_authd/posts/new')({
  component: NewPost,
  loader: async ()=> await fetchUser(),
});
  
export function NewPost() { 
  const create = useServerFn(createPost);
  const user = Route.useLoaderData();
  const frontmatter = `
---
title: My New Post
---

# markdown content to go here
  `;
  const [content,setContent] = useState(frontmatter);

  const handleSubmit = async (state,formData:FormData) => {
    console.log("creating post:", { author_id: user.id, content });
    const result = await create({ data: { author_id: user.id, content } });
    console.log("Post created:");
  };

  const handleClick = () => {
    if (editorRef.current) {
      setContent(editorRef.current.getMarkdown());
    }
  }

  const [state,formAction,isPending] = useActionState(handleSubmit,null)
  return (
    <div className='container m-4 p-4 border-2 border-gray-300'>
      <h1 className='text-2xl text-blue-600 mb-4'>Create New Post</h1>
     <form action={formAction}>
       <div>
         <h1>created by {user?.firstname} {user?.lastname} </h1>
       </div>
      
       <div className='flex flex-col w-4/5 justify-start items-start border-2 border-gray-300 my-4'>
         <label htmlFor="content">Content</label>
         <div className='w-full h-96 border-2 border-gray-300'>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='w-full h-full p-2 border-2 border-gray-300'
              cols={80}
              rows={20}
            />
         </div>
          
       </div>
       <button type="submit" >Create Post</button>
     </form>
    </div>
  )

}

