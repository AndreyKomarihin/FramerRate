'use client'
import {Header} from "@/components/Header/Header";
import {useRouter} from "next/router";
import styles from './movieInfo.module.scss'
import {Text} from "@/ui/Text/Text";
import Image from "next/image";
import {useEffect, useState} from "react";
import {Movie} from "@/app/api/popularMovies";

export default function Movieinfo() {
    const router = useRouter()

    const [movie, setMovie] = useState<Movie | null>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!router.isReady) return;

        const loadMovie = async () => {
            try {
                // Получаем ID из query параметров
                const { id } = router.query;

                if (!id) {
                    throw new Error('ID фильма не указан');
                }

                // Проверяем sessionStorage
                const savedMovie = sessionStorage.getItem('currentMovie');
                if (savedMovie) {
                    setMovie(JSON.parse(savedMovie));
                    sessionStorage.removeItem('currentMovie');
                    return;
                }

                // Загружаем с API
                const response = await fetch(`/api/movies/${id}`);
                if (!response.ok) throw new Error('Ошибка загрузки');
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Ошибка:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [router.isReady, router.query]);


    return (
        <>
        <Header navigate = {(route) => router.push(route)}/>
            <main>
                <div className={styles.poster}>
                    <div className={styles.movieInfoContainer}>
                        <img className={styles.miniPoster}
                             src={'https://upload.wikimedia.org/wikipedia/ru/d/d7/More_tv_%D0%BF%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%81%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D0%B0_%D0%B2%D0%B0%D1%88%D0%B0_%D1%87%D0%B5%D1%81%D1%82%D1%8C.jpg'}
                             alt={'Постер'}
                        />
                        <Text className={styles.title} size={38}>Место преступления - семья</Text>
                        <div className={styles.infoBox}>
                            <ul className={styles.info}>
                                <li className={styles.infoText}>{movie.genres[0]?.name || 'Жанр не указан'}</li>
                                <li className={styles.infoText}>Драмма</li>
                                <li className={styles.infoText}>2025 г.</li>
                            </ul>
                            <ul>
                                <li className={styles.infoText}>Россия</li>
                                <li className={styles.infoText}>16+</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}