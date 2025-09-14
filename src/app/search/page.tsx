'use client'
import {Header} from "@/components/Header/Header";
import {useRouter} from "next/navigation";
import styles from './search.module.scss'
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";
import {useCallback, useEffect, useRef, useState} from "react";
import {fetchPopularContent, Movie} from "@/app/api/popularMovies";
import {FilmCard} from "@/ui/FilmCard/FilmCard";
import cn from "classnames";
import {ConfigProvider, Pagination, ThemeConfig} from "antd";
import {paginationTheme} from "@/app/shared/constants/paginationTheme";
import {useMedia} from "@/app/shared/hooks/useMedia";


export default function Search () {
    const router = useRouter()

    const [allPopular, setAllPopular] = useState<Movie[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [inputSearch, setInputSearch] = useState('')
    const [dataSearchRes, setDataSearchRes] = useState<Movie[]>([])
    const [totalPages, setTotalPages] = useState<number | null>()
    const [currentPage, setCurrentPage] = useState<number | null>()

    const searchRef = useRef('')

    const {isMobile} = useMedia()

    useEffect(() => {
        searchRef.current = inputSearch
    }, [inputSearch]);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const {data: allData, error: allError, pages} = await fetchPopularContent(currentPage || 1, 20)
                if (allError) throw new Error(allError)
                if (allData) setAllPopular(allData)
                setTotalPages(pages)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [currentPage])

    const searchMovies = useCallback(async () => {
        const searchTerm = searchRef.current

        if (!searchTerm.trim()) {
            setDataSearchRes([])
            setIsSearching(false)
            return;
        }
            try {
                setIsSearching(true)
                const response = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=25&query=${searchRef.current}`,
                    {
                        headers: {
                            'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '50J8NSB-09M4XRW-HDWAK1J-EQBTHFT',
                            'Accept': 'application/json',
                        },
                    }
                )
                const data = await response.json()
                setDataSearchRes(data.docs)
            } catch (error) {
                setError('Ничего не найдено')
            }
            finally {
                setIsSearching(false)
            }


    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (inputSearch.trim().length >= 1) {
                searchMovies()
            } else if (inputSearch.trim().length === 0) {
                setDataSearchRes([])
                setIsSearching(false)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [inputSearch])

    return (
        <>
            <Header navigate = {(route) => router.push(route)}/>
            <main className={styles.main}>
                <div>
                    <h1 className={styles.searchTitle}>Поиск</h1>
                    <div className={styles.moviesContainer}>
                        <input value={inputSearch} onChange={(event) => setInputSearch(event.target.value)} className={styles.inputSearch} placeholder={'Название фильма, сериала, мультфильма'}/>
                        {inputSearch ? <CloseOutlined onClick={() => setInputSearch('')} className={`${styles.searchIcon} ${styles.clearBtn}`} style={{fontSize: '24px', color: '#959595', backgroundColor: '#010315', paddingLeft: '6px'}}/> : <SearchOutlined className={styles.searchIcon} style={{fontSize: '24px', color: '#959595', backgroundColor: '#010315', paddingLeft: '6px'}}/>}
                    </div>
                </div>
                <div className={cn(styles.moviesList, inputSearch ? styles.searchRes : null)}>
                        {!inputSearch && (
                            <h3 className={styles.recommendationsTitle}>Рекомендации для тебя</h3>
                        )}
                        <div className={styles.moviesBox}>
                            {isSearching ? (
                                Array.from({length: 20}).map((_, index) => (
                                    <div key={index} className={styles.loadingCard}></div>
                                ))
                            ) : inputSearch  ?
                                (
                                    dataSearchRes.length > 0 ? (
                                    dataSearchRes.map((movie) => (
                                                <FilmCard
                                                    key={movie.id}
                                                    id={movie.id}
                                                    rate={movie.rating.kp}
                                                    image={movie.poster?.url}
                                                    name={movie.name}
                                                    country={movie.countries[0]?.name}
                                                    genres={movie.genres[0]?.name}
                                                    year={movie.year}
                                                    series={movie.seriesLength ?? undefined}
                                                    type={movie.type}
                                                    description={movie.description}
                                                />
                                    ))
                                ) : (
                                    Array.from({length: 20}).map((_, index) => (
                                        <div key={index} className={styles.loadingCard}></div>
                                    ))
                                )
                            ) : isLoading ? (
                                Array.from({length: 20}).map((_, index) => (
                                    <div key={index} className={styles.loadingCard}></div>
                                ))
                            ) : (
                                allPopular.map((movie) => (
                                        <FilmCard
                                            key={movie.id}
                                            id={movie.id}
                                            rate={movie.rating.kp}
                                            image={movie.poster?.url || 'https://placehold.co/400x700/010315/FFFFFF?text=:('}
                                            name={movie.name}
                                            country={movie.countries[0]?.name}
                                            genres={movie.genres[0]?.name}
                                            year={movie.year}
                                            series={movie.seriesLength ?? undefined}
                                            type={movie.type}
                                            description={movie.description}
                                        />
                                    ))
                            )}
                    </div>
                    {!inputSearch && (
                        <div className={styles.paginationContainer}>
                            <ConfigProvider theme={paginationTheme}>
                                <Pagination className={styles.pagination}  showSizeChanger={false} onChange={(page) => setCurrentPage(page)} total={totalPages || 1}
                                            align={'center'}

                                />
                            </ConfigProvider>
                        </div>
                    )}
                </div>
            </main>

        </>
    )
}