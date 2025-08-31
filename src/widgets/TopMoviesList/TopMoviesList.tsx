import {Header} from "@/components/Header/Header";
import {FilmCard} from "@/ui/FilmCard/FilmCard";
import styles from './MoviesList.module.scss'

export const TopMoviesList = () => {

    return (
        <div className={styles.moviesList}>
            <FilmCard/>
        </div>
    );
}