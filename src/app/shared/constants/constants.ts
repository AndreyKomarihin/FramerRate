export const CAROUSEL_RESPONSIVE = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5.2,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 40
    }
};

export interface Favorites {
    id: number
    name: string
    image: string
    rate: number
    country: string
    genres: string
    year: number
    type: string
    description: string | null
    series?: number
    poster?: {
        url: string
    }
    rating?: {
        kp: number
    }
    countries?: Array<{
        name: string
    }>
    genresArray?: Array<{
        name: string
    }>
    seriesLength?: number
}