import {useEffect, useState} from "react";
import {fetchPopularContent} from "@/app/api/popularMovies";
import styles from './RecommendWatching.module.scss'
import {fetchTrailer} from "@/app/api/popularTrailer";
import {random} from "nanoid";
import {Text} from "@/ui/Text/Text";

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
}

export const RecommendWatching = () => {

    const [popular, setPopular] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState({
        all: true
    });
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(prev => ({...prev, all: true}))
                const {data: allData, error: allError} = await fetchPopularContent(1)

                if (allError) throw new Error(allError)
                if (allData) setPopular(allData)

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
            } finally {
                setIsLoading({
                    all: false
                })
            }
        }

        loadData()
    }, [])

    return (
        <div className={styles.recommendWatchingContainer}>
            <h1 className={styles.title}><span className={styles.accent}>ПОПРОБУЙ</span> FramerRate</h1>
            <h3 className={styles.subTitle}>От скучного вечера до киномарафона — <span className={styles.accent}>один</span> клик <br/>🚀🎬</h3>
        </div>
    )
}