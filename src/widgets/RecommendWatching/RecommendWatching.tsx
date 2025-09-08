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

    return (
        <div className={styles.recommendWatchingContainer}>
            <h1 className={styles.title}><span className={styles.accent}>ПОПРОБУЙ</span> FramerRate</h1>
            <h3 className={styles.subTitle}>От скучного вечера до киномарафона — <span className={styles.accent}>один</span> клик <br/>🚀🎬</h3>
        </div>
    )
}