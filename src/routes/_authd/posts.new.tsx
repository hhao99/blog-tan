import { useActionState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start'
import { createPost } from '~/lib/posts';
import { create } from 'domain';
import { z } from 'zod';


export const Route = createFileRoute('/_authd/posts/new')({
  component: NewPost,
});

export function NewPost() { 
  const create = useServerFn(createPost);
  const content = `---\n title: Sample Post\n author: John Doe \n--- \n# Hello World\n This is my first post!`

  const handleSubmit = async (state,formData:FormData) => {
    const author_id = Number(formData.get("author_id") as string);
    const content = String(formData.get("content"));
    console.log("creating post:", { author_id, content });
    const result = await create({ data: { author_id, content } });
    console.log("Post created:", result);
  };

  

  const [state,formAction,isPending] = useActionState(handleSubmit,null)
  return (
    <div className='container m-4 p-4 border-2 border-gray-300'>
      <h1 className='text-2xl text-blue-600 mb-4'>Create New Post</h1>
     <form action={formAction}>
       <div>
         <input type="text" id="author_id" value={1} name="author_id" readOnly/>
       </div>
      
       <div className='flex flex-col w-4/5 justify-start items-start'>
         <label htmlFor="content">Content</label>
         <textarea id="content" cols={60} rows={10} name="content" defaultValue={content}/>

       </div>
       <button type="submit">Create Post</button>
     </form>
    </div>
  )
}

