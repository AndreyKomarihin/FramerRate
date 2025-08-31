type Movie = {
    id: number
    name: string
    rating: {
        kp: number
    }
    poster: {
        url: string
    }
    year: number
    type: 'movie' | 'tv-series'
    countries: [{name: string}]
    genres: [{name: string}]
    seriesLength: number
};

export const fetchPopularFilms = async (): Promise<{ data: Movie[] | null, error: string | null }> => {
    try {
        const response = await fetch('https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&sortField=rating.kp&sortType=-1', {
            headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '698WV0C-47PMN6R-K9H1CZD-MRNW7RB',
                'Accept': 'application/json',
            },
        })

        const data = await response.json()
        return { data: data.docs || null, error: null }
    } catch (error) {
        if (error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: 'Неизвестная ошибка' }
    }
};