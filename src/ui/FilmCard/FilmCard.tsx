
import Image from "next/image";
import {Text} from "@/ui/Text/Text";
import styles from './FilmCard.module.scss'
import {useEffect, useState} from "react";
import cn from "classnames";
import {useRouter} from "next/navigation";
import {ClockCircleOutlined, HeartFilled, HeartOutlined} from "@ant-design/icons";
import { MouseEvent } from 'react';

interface Props {
    id: number,
    name: string,
    image: string,
    rate: number,
    country: string,
    genres: string,
    year: number,
    series?: number,
    type: string,
    movie?: {
        id: number
        name: string
        rating: { kp: number }
        poster: { url: string }
        year: number
        type: 'movie' | 'tv-series'
        countries: Array<{ name: string }>
        genres: Array<{ name: string }>
        seriesLength: number | null
    },
    description: string
}

export const FilmCard: React.FC<Props> = ({
                                              id,
                                              name,
                                              image,
                                              rate,
                                              country,
                                              genres,
                                              year,
                                              series,
                                              type,
                                              movie,
                                              description
                                          }) => {

    const [mouseEnter, setMouseEnter] = useState(false)

    const [integerPart, decimalPart] = rate.toFixed(1).split('.')
    const [isMounted, setIsMounted] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setIsFavorite(!!localStorage.getItem(JSON.stringify({
            id, name, image, rate, country, genres, year, series, type, description
        })))
    }, [name]);

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleMouseEnter = () => {
        setMouseEnter(true)
    }

    const handleMouseLeave = () => {
        setMouseEnter(false)
    }

    const handleClick = () => {
        if (!isMounted) return

        sessionStorage.setItem('currentMovie', JSON.stringify({
            id, name, image, rate, country, genres, year, series, type, description
        }))

        router.push(`/movie/${id}`)
    }

    const handlerClickFavorite = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation()

        if (localStorage.getItem(JSON.stringify({
            id, name, image, rate, country, genres, year, series, type, description
        }))){
            localStorage.removeItem(JSON.stringify({
                id, name, image, rate, country, genres, year, series, type, description
            }))
        } else {
            localStorage.setItem(JSON.stringify({
                id, name, image, rate, country, genres, year, series, type, description
            }), 'favorite')
        }

        setIsFavorite(!isFavorite)
    }

    return (
        <div onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
             className={styles.card}>
            <img className={cn(
                styles.movieImg,
                mouseEnter && styles.hidden
            )} src={image} alt={''}/>
            {rate === 0 ? <ClockCircleOutlined className={cn(styles.rating, mouseEnter && styles.ratingBlur)} style={{fontSize: '32px'}} /> : <div className={cn(styles.rating, mouseEnter && styles.ratingBlur)}>
                <span className={styles.integerPart}>{integerPart}.</span>
                <span className={styles.decimalPart}>{decimalPart}</span>
            </div>}
            {!mouseEnter && (
                isFavorite ?
                    <HeartFilled
                        onClick={(e) => handlerClickFavorite(e)}
                        className={cn(styles.favorites, localStorage.getItem(JSON.stringify({
                            id, name, image, rate, country, genres, year, series, type, description
                        })) ? styles.favoritesTrue : null)}
                        style={{fontSize: '32px'}
                        }/>
                    : <HeartOutlined
                        onClick={(e) => handlerClickFavorite(e)}
                        className={cn(styles.favorites, localStorage.getItem(JSON.stringify({
                            id, name, image, rate, country, genres, year, series, type, description
                        })) ? styles.favoritesTrue : null)}
                        style={{fontSize: '32px'}
                    }/>
                    )}

            {mouseEnter && (
                <>
                    <div className={cn(styles.mouseEnterContainer, mouseEnter && styles.mouseEnterContainerActive)}>
                        <Text size={24}>{name}</Text>
                        {series && (<Text className={styles.series}>{series} серий</Text>)}
                    </div>
                    <div className={styles.movieInfo}>
                        <Text className={styles.movieInfoText}>{year} г.</Text>
                        <Text className={styles.movieInfoText}>{country}</Text>
                        <Text className={cn(styles.genres, styles.movieInfoText)}>
                            {genres}
                        </Text>
                    </div>
                    {<HeartOutlined
                        onClick={(e) => handlerClickFavorite(e)}
                        className={cn(styles.favorites, localStorage.getItem(JSON.stringify({
                            id, name, image, rate, country, genres, year, series, type, description
                        })) ? styles.favoritesTrue : null)}
                        style={{fontSize: '32px'}
                        }/>}
                </>
            )}

        </div>
    )
}