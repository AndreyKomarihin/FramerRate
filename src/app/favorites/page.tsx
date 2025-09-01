'use client'
import {Header} from "@/components/Header/Header";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {FilmCard} from "@/ui/FilmCard/FilmCard";
import styles from './favorites.module.scss'
import {ConfigProvider, Pagination} from "antd";
import {paginationTheme} from "@/app/shared/constants/paginationTheme";

interface Favorites {
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

export default function Favorites() {
    const router = useRouter()

    const [isFavorites, setIsFavorites] = useState<Favorites[]>([])


    const getAllFavorites = () => {
        const favorites: Favorites[] = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key !== null) {
                const value = localStorage.getItem(key)
                console.log(`Key: ${key}, Value: ${value}, Type: ${typeof value}`)

                if (value === 'favorite') {
                    try {
                        const movieData: Favorites = JSON.parse(key)
                        favorites.push(movieData)
                    } catch (e) {
                        console.error('Error parsing:', e)
                    }
                }
            }
        }
        setIsFavorites(favorites);
        return favorites;
    }

    useEffect(() => {
        getAllFavorites()
    }, []);

    return (
        <>
            <Header navigate={(route) => router.push(route)}/>
            <main className={styles.main}>
                <h3 className={styles.favoriteTitle}>Избранное</h3>
                <div className={styles.favoriteContainer}>
                    {isFavorites.map((movie) => {
                        const seriesNumber = movie.series ? Number(movie.series) : undefined
                        return (
                            <FilmCard
                                key={movie.id}
                                id={movie.id}
                                rate={movie.rate}
                                image={movie.image}
                                name={movie.name}
                                country={movie.country}
                                genres={movie.genres}
                                year={movie.year}
                                series={seriesNumber}
                                type={movie.type}
                                description={movie.description ?? ''}
                            />
                        )
                    })}
                </div>
            </main>
        </>
    )
}