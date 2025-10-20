import { PrismaClient } from '~/prisma/client';

const users = [
    {
        firstname: "Eric",
        lastname: "Hao",
        email: "eric@gmail.com",
        password: "changeme",
        posts: {
            create: [
                { content: "tanstack/start setup"},
                { content: "router configure"},
                { content: "prisma integration"},
                { content: "authentication"},
                { content: "todo"},
                { content: "todo"}
            ]
        }
    }
]

export async function main() {
    const prisma = new PrismaClient();
    for( let u of users) {
        await prisma.user.create({data: u});
    }
    console.log('prisma db seeded!')
}

await main();