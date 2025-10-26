import type { ReactNode } from 'react';
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { fetchUser } from './_authd';
import appCss from '~/routes/style.css?url';

import Header from '~/components/layout/header';

import Footer from '~/components/layout/footer';
import NotFound from '~/components/not-found';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss},
    ]
  }),
  loader: async ()=> {
    const user = await fetchUser();
    if(user) {
      return { user };
    }
    return null;
  },
  component: RootComponent,
  notFoundComponent: ()=> <NotFound />
})

function RootComponent() {
  const { user } = Route.useLoaderData();
  return (
    <RootDocument>
      <div className="w-full flex bg-background text-foreground flex-col justify-between">
        <Header user={user} />
        <main className="w-full h-screen z-1000 mb-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}