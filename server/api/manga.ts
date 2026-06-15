export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  const username = config.public.malUsername
  const clientId = config.malClientId
  
  if (!username || !clientId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'MyAnimeList configuration is missing'
    })
  }

  try {
    const response = await $fetch(`https://api.myanimelist.net/v2/users/${username}/mangalist`, {
      headers: {
        'X-MAL-CLIENT-ID': clientId
      },
      query: {
        sort: 'list_score',
        limit: 20,
        fields: 'list_status,mean,synopsis,authors,num_chapters,num_volumes,main_picture'
      }
    })
    
    // Process response to format it nicely for the frontend
    // @ts-ignore
    const mangaList = response.data.map(item => {
      const manga = item.node
      const status = item.list_status
      return {
        id: manga.id,
        title: manga.title,
        picture: manga.main_picture?.large || manga.main_picture?.medium,
        score: status.score,
        userStatus: status.status,
        meanScore: manga.mean,
        synopsis: manga.synopsis,
        authors: manga.authors?.map((a: any) => `${a.node.first_name || ''} ${a.node.last_name || ''}`.trim()).join(', ') || 'Unknown Author',
        chapters: manga.num_chapters,
        volumes: manga.num_volumes
      }
    })
    
    return mangaList
  } catch (error) {
    console.error('Failed to fetch from MyAnimeList:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch manga list'
    })
  }
})
