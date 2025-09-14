export const carouselResponsive = {
    superLargeDesktop: {
        breakpoint: { max: 3000, min: 1920 },
        items: 5.2,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 1920, min: 1080 },
        items: 4,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1080, min: 550 },
        items: 3.5,
        partialVisibilityGutter: 40
    },
    mobile: {
        breakpoint: { max: 550, min: 0 },
        items: 2.3,
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