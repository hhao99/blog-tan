import { createFileRoute,redirect } from '@tanstack/react-router'
import { deletePost } from '~/lib/posts'
import { fetchUser } from '../_authd'
export const Route = createFileRoute('/_authd/posts/$id_/delete')({
  beforeLoad: async ({params: {id}})=> {
    const user = await fetchUser();
    
    if(!user.id) {
        return {
            error: true,
            message: 'login user is not the author of this post'
        }
    }
    else {
        await deletePost({data: { id: parseInt(id)}});
        return redirect({ href: '/posts' });
    }
  }
})
