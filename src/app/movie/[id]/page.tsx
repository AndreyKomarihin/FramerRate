'use client'
import {Header} from "@/components/Header/Header";
import {useParams, useRouter} from "next/navigation";
import styles from './movieInfo.module.scss'
import {Text} from "@/ui/Text/Text";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Movie} from "@/app/api/popularMovies";
import {useMediaQuery} from "@/app/shared/hooks/useMediaQuery";
import {useMedia} from "@/app/shared/hooks/useMedia";
import cn from "classnames";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {describe} from "node:test";

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
    const [showDescription, setShowDescription] = useState<boolean>(false)

    const {isMobile} = useMedia()

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


    console.log(showDescription)

    return (
        <>
        <Header navigate = {(route) => router.push(route)}/>
            {!isMobile ? <main>
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
                                <p className={styles.rating}>{integerPart}.<span
                                    className={styles.ratingDecimal}>{decimalPart}</span></p>
                            </div>
                        </div>
                        <h3 className={styles.title}>{movie?.name}</h3>
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
                        { movie?.description ?
                        <div className={styles.descriptionBox}>
                            <Text size={38}>Описание:</Text>
                            <Text className={styles.description} size={20}>{movie?.description}</Text>
                        </div>
                            : null
                        }
                    </div>
                </div>
            </main>
                :
                <main>
                    <div className={styles.poster}>
                        <img className={styles.mobilePoster} src={movie?.image} alt={'poster'}/>
                        <div className={styles.movieInfoContainer}>
                            <div className={styles.mobileTitleBox}>
                                <h3 className={styles.title}>{movie?.name}</h3>
                                <div className={styles.ratingBox}>
                                    <p className={styles.ratingText}>Рейтинг</p>
                                    <p className={styles.rating}>{integerPart}.<span
                                        className={styles.ratingDecimal}>{decimalPart}</span></p>
                                </div>
                            </div>
                            <div className={styles.infoBox}>
                                <ul className={styles.info}>
                                    <li className={styles.infoText}>{movie?.type === 'movie' ? 'Фильм' : 'Сериал'}</li>
                                    <li className={styles.infoText}>{movie?.genres}</li>
                                    <li className={styles.infoText}>{movie?.year}</li>
                                </ul>
                                <ul>
                                    <li className={styles.infoText}>Страна: {movie?.country}</li>
                                    <li className={styles.infoText}>{movie?.series ? 'Всего серий:' : null} {movie?.series}</li>
                                </ul>
                            </div>
                            { movie?.description ?
                            <div className={styles.descriptionBox}>
                                <p className={styles.descriptionTitle}>Описание:</p>
                                <p className={cn (styles.description, showDescription ? styles.showDescription : null)}>{movie?.description}</p>
                                <button onClick={() => setShowDescription(!showDescription)}>
                                    {showDescription ?
                                        <>
                                            <p>Скрыть</p>
                                            <UpOutlined />
                                        </>
                                        :
                                        <>
                                            <p>Показать</p>
                                            <DownOutlined />
                                        </>
                                    }
                                </button>
                            </div>
                                : null
                            }
                        </div>

                    </div>
                </main>
            }
        </>
    )
}