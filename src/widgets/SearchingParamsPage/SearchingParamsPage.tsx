import {SearchParams} from "@/ui/SearchParams/SearchParams";
import styles from "@/widgets/SearchingParamsPage/movies.module.scss";
import {Movie} from "@/app/api/popularMovies";
import {FilmCard} from "@/ui/FilmCard/FilmCard";
import {useAppSelector} from "@/app/store/hooks";
import React from "react";

interface Props {
    type: 'movie' | 'tv-series' | 'cartoon' | ''
}

export const SearchingParamsPage: React.FC<Props> = ({type}) => {
    const movies = useAppSelector(state => state.movies.movies)
    const loading = useAppSelector(state => state.loading)
    const filters = useAppSelector(state => state.filters)
    const error = useAppSelector(state => state.error)


    return (
        <>
        <SearchParams category={type}/>
    <div className={styles.filmCardContainer}>
        {movies && movies.length === 0 ? (
            <div>YYYYYY</div>
        ) : movies ? (
            movies.map((movie: Movie) => {
                if (movie.poster?.url){
                    return (
                        <FilmCard
                            key={movie.id}
                            id={movie.id}
                            rate={movie.rating.kp ? movie.rating.kp : movie.rating.imdb}
                            image={movie.poster?.url || 'https://via.placeholder.com/300x450'}
                            name={movie.name}
                            country={movie?.countries?.[0]?.name}
                            genres={movie?.genres?.[0]?.name}
                            year={movie.year}
                            series={movie.seriesLength ?? undefined}
                            type={movie.type}
                            description={movie.description}
                        />
                    )}
            })
        ) : null}
    </div>
        </>
    )
}