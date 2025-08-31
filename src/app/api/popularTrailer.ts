export type Trailer = {
    url: string;
    name: string;
    site: string;
    type: "TRAILER" | "TEASER" | "CLIP" | "FEATURETTE";
};

export const fetchTrailer = async (movieId: number): Promise<{ data: Trailer [] | null, error: string | null }> => {
    try {
        const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${movieId}/videos`, {
            headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '698WV0C-47PMN6R-K9H1CZD-MRNW7RB',
                'Accept': 'application/json',
            },
        })

        const data = await response.json()
        const trailers = data.videos?.filter((video: any) =>
            video.type === "TRAILER" &&
            (video.site === "youtube" || video.site === "vk")
        ) || [];
        return { data: trailers, error: null }
    } catch (error) {
        if (error instanceof Error) {
            return { data: null, error: error.message }
        }
        return { data: null, error: "Неизвестная ошибка" }
    }
};