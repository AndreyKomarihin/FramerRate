'use client'
import {Header} from "@/components/Header/Header";
import {useParams, useRouter} from "next/navigation";
import styles from './movieInfo.module.scss'
import {Text} from "@/ui/Text/Text";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Movie} from "@/app/api/popularMovies";

type MovieInfo = {
    id: number
    name: string
    genres: string
    series: number
    rate: number
    image: string
    year: number
    type: 'movie' | 'tv-series'
    country: string
    seriesLength: number
    description: string
}

export default function Movieinfo() {
    const params = useParams()
    const router = useRouter()

    const [movie, setMovie] = useState<MovieInfo | null>()
    const [loading, setLoading] = useState(true)
    const [integerPart, decimalPart] = movie?.rate.toFixed(1).split('.')  ?? ['0', '0']

    useEffect(() => {
        console.log('ID from params:', params.id)
        const loadMovie = async () => {
            try {
                const id = params.id
                if (!id) throw new Error('ID фильма не указан')

                const savedMovie = sessionStorage.getItem('currentMovie')
                if (savedMovie) {
                    setMovie(JSON.parse(savedMovie))
                    localStorage.removeItem('currentMovie')
                    return
                }

                const response = await fetch(`/api/movies/${id}`, {
                    headers: {
                        'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '50J8NSB-09M4XRW-HDWAK1J-EQBTHFT',
                        'Accept': 'application/json',
                    },
                })
                if (!response.ok) throw new Error('Ошибка загрузки')
                console.log(response.json())
                const data = await response.json()
                setMovie(data)
            } catch (error) {
                console.error('Ошибка:', error)
            } finally {
                setLoading(false)
            }
        }

        loadMovie()
    }, [params.id])



    return (
        <>
        <Header navigate = {(route) => router.push(route)}/>
            <main>
                <div className={styles.poster}
                     style={{backgroundImage: `url(${movie?.image})`}}>
                    <div className={styles.movieInfoContainer}>
                        <div className={styles.posterRateBox}>
                            <div className={styles.miniPosterBox}>
                                <img className={styles.miniPoster}
                                     src={movie?.image}
                                     alt={'Не удалось прогрузить постер'}
                                />
                            </div>
                            <div className={styles.ratingBox}>
                                <p className={styles.ratingText}>Рейтинг</p>
                                <Text size={38} className={styles.rating}>{integerPart}.<span
                                    className={styles.ratingDecimal}>{decimalPart}</span></Text>
                            </div>
                        </div>
                        <Text className={styles.title} size={38}>{movie?.name}</Text>
                        <div className={styles.infoBox}>
                            <ul className={styles.info}>
                                <li className={styles.infoText}>{movie?.type === 'movie' ? 'Фильм' : 'Сериал'}</li>
                                <li className={styles.infoText}>{movie?.genres}</li>
                                <li className={styles.infoText}>{movie?.year}</li>
                            </ul>
                            <ul>
                                <li className={styles.infoText}>{movie?.country}</li>
                                <li className={styles.infoText}>{movie?.series ? `${movie?.series} серий` : null}</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.descriptionBox}>
                        <Text size={38}>Описание:</Text>
                        <Text className={styles.description} size={20}>{movie?.description}</Text>
                    </div>

                </div>
            </main>
        </>
    )
}