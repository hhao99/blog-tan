import { createFileRoute, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

import { useAppSession } from '~/lib/session';
import { prisma } from '~/lib/prisma';

export const Route = createFileRoute('/_authd')({
  beforeLoad: ({context})=> {
    console.log('authd session info: ')
    console.log(context);
  }
})

const  SigninSchema = z.object({
  email: z.email(),
  password: z.string().min(8)
})

const SignupSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.email(),
  password: z.string().min(8)
})


export const LoginFn = createServerFn({method: "POST"})
  .inputValidator( SigninSchema)
  .handler( async ({data: {email,password}})=> {
    const result = await prisma.user.findUnique({
      where: { email},
      select: {
        id: true,
        firstname: true,
        lastname: true,
      }
    });
    if(!result) {
      return {
        error: true,
        userNotFound: true,
        message: "Login failed, use not found"
      }
    }
    if(result) {
      console.log(`user: ${result.firstname} ${result.lastname}`)
      const session = await useAppSession()
      await session.update({
        email: email,
        user_id: result.id,
        firstname: result.firstname,
        lastname: result.lastname
      });
      return {
        error: false,
        userNotFound: false,
        message: `User: ${result.firstname} ${result.lastname} logged in.`
      }
    }
  });
  export const SignupFn = createServerFn({method: "POST"})
    .inputValidator(SignupSchema)
    .handler(async ({data: {firstname, lastname, email, password}})=>{
      
      // todo: hashed password
      const result = await prisma.user.findUnique({where: { email}});
      if( result ) {
        return {
          error: true,
          userExists: true,
          message: "user signup failed"
        }
      }
      const user = await prisma.user.create({ data: {firstname,lastname,email,password}})
      return {
        error: false,
        userExists: false,
        user: user,
        message: "user signup success"
      }
    })

  export const getSessionFn = createServerFn({method: "GET"})
    .handler( async ()=> {
      const session = await useAppSession();
      return {
        email: session.data.email,
        firstname: session.data.firstname,
        lastname: session.data.lastname,
        id: session.data.user_id
      }
    })
