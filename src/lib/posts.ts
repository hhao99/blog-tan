 import { prisma } from '~/lib/prisma';

  export async function getAllPosts() {
    return await prisma.post.findMany();
  }

  export async function getPostById({id}: {id: number}) {
    return await prisma.post.findUnique({
      where: { id }
    }); 
  }