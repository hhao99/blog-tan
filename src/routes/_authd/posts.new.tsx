import { useRef, useState, useActionState } from 'react';
import { createFileRoute, useRouter} from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';

//tiptap editor 
import Tiptap from '~/components/tiptap';


import { createPost } from '~/lib/posts';
import { fetchUser } from '../_authd';


export const Route = createFileRoute('/_authd/posts/new')({
  component: NewPost,
  loader: async ()=> await fetchUser(),
});
  
export function NewPost() { 
  const create = useServerFn(createPost);
  const user = Route.useLoaderData();
  const router = useRouter();

  const [content,setContent] = useState('');

  const handleSubmit = async (state,formData:FormData) => {
    console.log("creating post:", { author_id: user.id, content });
    const result = await create({ data: { author_id: user.id, content } });
    if(result) {
      router.invalidate();
      router.navigate({ href: '/posts' });
    }
  };

  
  const [state,formAction,isPending] = useActionState(handleSubmit,null)
  return (
    <div className='container m-4 p-4 border-2 border-gray-300'>
      <h1 className='text-2xl text-blue-600 mb-4'>Create New Post</h1>
     <form action={formAction}>
       <div className='flex justify-end mr-4'>
         <h3 className='text-bold text-sm text-gray-600'>created by {user?.firstname} {user?.lastname} </h3>
       </div>
      
       <div className='flex flex-col w-full/5 justify-start items-start my-4'>
         <label htmlFor="content">Content</label>
         <div className='w-full h-3/4 p-2'>
           <Tiptap content={content}  onChange={setContent} />
         </div>
        </div>
          
       <div className='flex justify-end items-center mr-8'>
       <button
         className='bg-blue-400 text-white px-8 py-2 rounded'
         type="submit" >Create Post</button>
        </div>
     </form>
    </div>
  )

}

