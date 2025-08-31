'use client'

import {Header} from "@/components/Header/Header";
import {useRouter} from "next/navigation";
import styles from './movies.module.scss';
import {useEffect, useRef, useState} from "react";
import {fetchPopularContent} from "@/app/api/popularMovies";
import {movieCountries, movieSettings, movieYears} from "@/app/shared/constants/movieSettings";
import {SelectorMovie} from "@/ui/SelectorMovie/SelectorMovie";
import cn from "classnames";
import {SearchParams} from "@/ui/SearchParams/SearchParams";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useAppSelector} from "@/app/store/hooks";
import {FilmCard} from "@/ui/FilmCard/FilmCard";

export default function Movies () {

    const router = useRouter()

    const [searchParamsActive, setSearchParamsActive] = useState(false)

    const movies = useAppSelector(state => state.movies)
    const loading = useAppSelector(state => state.loading)
    const filters = useAppSelector(state => state.filters)
    const error = useAppSelector(state => state.error)

    console.log(movies)

    console.log(movies[0])

    return (
        <>
            <Header navigate = {(route) => router.push(route)}/>
            <main>
                <div onClick={() => setSearchParamsActive(!searchParamsActive)} className={styles.searchParams}>
                    <h3 className={styles.searchParamsText}>Параметры поиска</h3>
                    {searchParamsActive ? <UpOutlined style={{ fontSize: '20px' }}/> : <DownOutlined style={{ fontSize: '20px' }} />}
                </div>
                {searchParamsActive && <SearchParams category={'movie'}/>}
                {movies[0] && movies[0].id ? (

                    <FilmCard key={movies[0]?.id} id={movies[0]?.id} name={movies[0]?.name} image={movies[0]?.poster?.url} movie={movies[0]} rate={movies[0]?.id} country={movies[0]?.name} genres={movies[0]?.name} year={movies[0]?.id} series={movies[0]?.id} type={movies[0]?.type} description={movies[0]?.description}
                    />) : (
                    <div>Загрузка данных...</div>
                )}
            </main>
        </>
    )
}