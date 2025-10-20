import { use, useState, useActionState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { LoginFn, SignupFn } from '~/routes/_authd';

export const Login = ({action}: {action: string}) => {
    const router = useRouter();
    const [error,setError] = useState({})
    
    const signIn = useServerFn(LoginFn);
    const signUp = useServerFn(SignupFn);
    async function handleSubmit(state,formData: FormData) {
        if(action === 'signin') {
            // signin action
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const result = await signIn({data: {email, password}});
            if( !result?.error) {
                router.invalidate()
                router.navigate({to: '/posts'})
            }
            else {
                setError(result)
            }
        }
        else {
            // signup action
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            const firstname = formData.get('firstname') as string;
            const lastname = formData.get('lastname') as string;

            const result = await signUp({data: {email, password, firstname, lastname}});
            if(!result?.error) {
                router.invalidate();
                router.navigate({ to: '/login'})
            }

        }
    }

    const [state,formAction] = useActionState(handleSubmit,null)
    return (
        <div className="fixed inset-0 bg-white dark:bg-dark flex justify-center items-start p-8">
            
            <div className="bg-white dark:text-white dark:bg-gray-600 rounded-lg shadow-lg w-full max-x-md p-8">
                <h1 className="text-3xl font-bold dark:text-white mb-4">Tanstack Blog {action==='signin'?'Sign In':'Sign Up'}</h1>
                {error.error && <div className='text-red-600'>
                        {error.message}
                    </div>}
                <form action={formAction}>
                 <div className="" hidden={action==='signin'}>
                    <div>
                        <label htmlFor='firstname'>Firstname:
                            <input 
                            type='text' name='firstname' placeholder='your firstname' 
                            className='px-2 py-1 w-full text-sm rounded border border-gray-500/20 bg-white dark:bg-gray-800'
                            defaultValue={`first`}/>
                        </label>
                        </div>
                    <div>
                        <label htmlFor='email'>Lastname:
                            <input 
                            type='text' name='lastname' placeholder='your lastname' className='px-2 py-1 w-full text-sm rounded border border-gray-500/20 bg-white dark:bg-gray-800'
                            defaultValue={`last`}/>
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor='email'>Email:
                        <input 
                        type='text' name='email' placeholder='your email' 
                        className='px-2 py-1 w-full text-sm rounded border border-gray-500/20 bg-white dark:bg-gray-800'
                        defaultValue={`eric@gmail.com`}/>
                    </label>
                </div>
                 <div>
                    <label htmlFor='password'>Password:
                        <input 
                        type='password' name='password' defaultValue='xwxwxwxwxw' 
                        className='px-2 py-1 w-full text-sm rounded border border-gray-500/20 bg-white dark:bg-gray-800'
                        placeholder='password'/>
                    </label>
                </div>
                <div>
                    <button type='submit' onClick={()=> {console.log('submitting')  }}
                    className='w-full bg-blue-300 text-white rounded py-2 font-semibold uppercase'
                    >{action==='signin'?"Login": "Register"}</button>
                </div>
                </form>

            </div>
        </div>
    )
}