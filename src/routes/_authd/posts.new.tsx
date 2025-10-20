import { useEffect,useState } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { getSessionFn } from '~/routes/_authd'

export const Route = createFileRoute('/_authd/posts/new')({
  beforeLoad: async ()=> {
    console.log("before post new component ")
    const session = await getSessionFn();
  },
  component: Post,
})

function Post() { 

  return (
    <>
     <h1>Post NEW</h1>
    </>
  )
}

