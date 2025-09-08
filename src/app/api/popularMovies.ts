export type Movie = {
    id: number
    name: string
    rating: {
        kp: number
        imdb: number
    }
    poster: {
        url: string
    }
    year: number
    type: 'movie' | 'tv-series'
    countries: [{name: string}]
    genres: [{name: string}]
    seriesLength?: number
    description: string
}

export const fetchPopularContent = async (page: number = 1, limit: number = 24, type?: 'movie' | 'tv-series'):
    Promise<{ data: Movie[] | null, error: string | null, pages?: number}> => {
    try {
        const url = new URL(`https://api.kinopoisk.dev/v1.4/movie`)
        url.searchParams.append('page', page.toString())
        url.searchParams.append('limit', limit.toString())
        url.searchParams.append('sortField', 'rating.kp')
        url.searchParams.append('sortType', '-1')

        if (type) {
            url.searchParams.append('type', type)
        }

        const response = await fetch(url.toString(), {
            headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '50J8NSB-09M4XRW-HDWAK1J-EQBTHFT',
                'Accept': 'application/json',
            },
        })

        const data = await response.json()
        return { data: data.docs || null, error: null, pages: data.pages }
    } catch (error) {
        if (error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: 'Неизвестная ошибка' }
    }
}