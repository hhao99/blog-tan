
import { createFileRoute, useRouter} from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { toast } from 'sonner';





//tiptap editor 
import Tiptap from '~/components/tiptap';

//shadcn ui
import { Button } from '~/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '~/components/ui/card'
import { Label } from '~/components/ui/label';
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
import { InputGroup, InputGroupAddon, InputGroupText } from '~/components/ui/input-group';
//lucide icon
import { SaveIcon } from 'lucide-react';

// lib 
import { createPost } from '~/lib/posts';
import { fetchUser } from '../_authd';


const newPostSchema = z.object({
  blog: z.string().min(10, "content should be at lease 10 characters")
});

export const Route = createFileRoute('/_authd/posts/new')({
  component: NewPostForm,
  loader: async ()=> await fetchUser(),
});
  
export function NewPostForm() { 
  const create = useServerFn(createPost);
  const user = Route.useLoaderData();
  const router = useRouter();
  
 
  const form = useForm({
    defaultValues: {
      blog: `test`
    },
    validators: {
      onBlur: newPostSchema,
      onSubmit: newPostSchema,
    },
    onSubmit: async ({value}) => {
      const result = await create({ data: {
        author_id: user.id,
        content: value.blog
      }});

      if(result) {
        router.invalidate();
        router.navigate({ href: '/posts'})
      }
    }
  })

  return (
    <>
    <form id="new-post-form" onSubmit={ (e)=> {
          e.preventDefault();
          form.handleSubmit();
        }}>
          
        <Card>
          <CardHeader>
            <CardTitle>Post a new blog</CardTitle>
            <CardDescription>
              authorize a new blog to record the idea ...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
            <Label htmlFor='content'>Content:</Label>
            <form.Field name='blog' 
              children={(field)=>{
                return(
                  <Field data-invalid={!field.state.meta.isValid}>
                    <FieldLabel htmlFor={field.name}>blog content:</FieldLabel>
                    <Tiptap content={field.state.value}
                      onChange={ (content)=> field.handleChange(content) } />   
                  </Field>
                )
              }}
            />
            
        </FieldGroup>
        <Field orientation='horizontal'>
          <Button type='button' variant='outline'
            onClick={ ()=> form.reset()}
          >reset</Button>
          <Button type='submit' form='new-post-form'>
            <SaveIcon/></Button>
        </Field>
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
    </form>
    </>
  )

}

