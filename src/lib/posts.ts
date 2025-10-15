 const posts = [
    {id: 1, title: 'first post', content: "first post"},

    {id: 2, title: '2nd post', content: "second post"}
  ]

  export async function getAllPosts() {
    return posts;
  }

  export async function getPostById({id}: {id: number}) {
    console.log('get post with id: ', id)
    return (posts.filter( post=> post.id == id))[0]
  }