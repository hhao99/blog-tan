import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner';
import { z } from 'zod'

export const Route = createFileRoute('/_authd/t1')({
  component: RouteComponent,
})

const newPostSchema = z.object({
    blog: z.string().min(8,'description must be at lease 8 chars')
})
function RouteComponent() {
    const form = useForm({
        defaultValues: {
            blog: 'your blog'
        },
        validators: {
            onSubmit: newPostSchema,
        },
        onSubmit: ({value})=> {
            console.log('submmiting...')
        }
    })
  return (
    <>
        <form onSubmit={ (e) => {
            e.preventDefault();
            form.handleSubmit();
        }}>
            <form.Field name='blog'
                children={ (field)=> {
                    return(
                        <>
                        <label htmlFor='field.name'>Description</label>
                        <input name={field.name} type='text' 
                            defaultValue={field.state.value}
                        onChange={ e=> field.handleChange(e.target.value)} />
                        </>
                    )
                }}
            />
            <button type='submit'>submit</button>
        </form>
    </>
)
}
