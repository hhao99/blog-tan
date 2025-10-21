import { createFileRoute, redirect } from '@tanstack/react-router'
import { LogoutFn } from './_authd';
export const Route = createFileRoute('/logout')({
    preload: false,
    loader: ()=> LogoutFn(),
})


