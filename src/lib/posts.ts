 import { createServerFn } from '@tanstack/react-start';
 import { z } from 'zod';
 import matter from 'gray-matter';

 import type { Post } from '~/prisma/client';
 import { prisma } from '~/lib/prisma';
 
const postMatter = (post: Post) => {
    const {data: frontmatter, content} = matter(post?.content || '' );
    return {
      ...post,
      frontmatter,
      content,
    };
}
  export const  getAllPosts = createServerFn({method: "GET"}).handler(async () => {
    const posts = await prisma.post.findMany();
    return posts.map(postMatter);
  });

  export const getPostById = createServerFn({method: "GET"})
  .inputValidator( (data: {id: number}) => data) 
  .handler(async ({data:{id}}) => {
    const post = await prisma.post.findUnique({ where: { id }}); 
   
    return {...postMatter(post!)};
  })
  export const createPost = createServerFn({method: "POST"})
  .inputValidator( (data: {author_id: number; content: string}) => data )
  .handler(async ({data:{author_id, content}}) => {
    return await prisma.post.create({
      data: {
        author_id,
        content,
      }
    });
  })