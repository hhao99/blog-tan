 import { createServerFn } from '@tanstack/react-start';
 import { z } from 'zod';
 import { parse} from 'zod-matter';
 import type { Post } from '~/prisma/client';
 import { prisma } from '~/lib/prisma';
 
 export const PostFrontmatterSchema = z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().min(1).max(500).optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
    publishedAt: z.string().optional(),
 });
const postMatter = (post: Post) => {
    const {data, content} = parse(post?.content, PostFrontmatterSchema);
    return {
      ...post,
      frontmatter: data,
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