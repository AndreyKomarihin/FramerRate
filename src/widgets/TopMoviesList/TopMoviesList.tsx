'use client'
import {useEffect, useState} from "react"
import {MoviesCarousel} from "@/widgets/MoviesCarouesel/MoviesCarousel"
import {fetchPopularContent, Movie} from "@/app/api/popularMovies"
import styles from './TopMoviesList.module.scss'
import {Text} from "@/ui/Text/Text";

export const TopMoviesList = () => {

    const [allPopular, setAllPopular] = useState<Movie[]>([])
    const [popularMovies, setPopularMovies] = useState<Movie[]>([])
    const [popularSeries, setPopularSeries] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState({
        all: true,
        movies: true,
        series: true
    });
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(prev => ({...prev, all: true}))
                const {data: allData, error: allError} = await fetchPopularContent(24)
                if (allError) throw new Error(allError)
                if (allData) setAllPopular(allData)

                setIsLoading(prev => ({...prev, movies: true}))
                const {data: moviesData, error: moviesError} = await fetchPopularContent(1, 24, 'movie')
                if (moviesError) throw new Error(moviesError)
                if (moviesData) setPopularMovies(moviesData)

                setIsLoading(prev => ({...prev, series: true}))
                const {data: seriesData, error: seriesError} = await fetchPopularContent(1, 24,'tv-series')
                if (seriesError) throw new Error(seriesError)
                if (seriesData) setPopularSeries(seriesData)

            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
            } finally {
                setIsLoading({
                    all: false,
                    movies: false,
                    series: false
                })
            }
        }

        loadData()
    }, [])

    return (
        <div>
            <MoviesCarousel isLoading={isLoading.all} error={error} movies={allPopular} title='Выбор пользователей'/>
            <div className={styles.promoMovieContainer}>
                <Text className={styles.title}>А что это такое?</Text>
                <ul className={styles.promoMovieBox}>
                    <li><a><img className={styles.promoMovie} src={'/hutor1.webp'}/></a></li>
                    <li><a><img className={styles.promoMovie} src={'/hutor2.webp'}/></a></li>
                    <li><a><img className={styles.promoMovie} src={'/hutor3.webp'}/></a></li>
                    <li><a><img className={styles.promoMovie} src={'/hutor4.webp'}/></a></li>
                    <li><a><img className={styles.promoMovie} src={'/hutor5.webp'}/></a></li>
                </ul>
            </div>
            <MoviesCarousel isLoading={isLoading.movies} error={error} movies={popularMovies} title='Лучшие фильмы'/>
            <MoviesCarousel isLoading={isLoading.series} error={error} movies={popularSeries} title='Лучшие сериалы'/>
        </div>
    )
}