import styles from "./SearchParams.module.scss";
import {movieCountries, movieSettings, movieYears} from "@/app/shared/constants/movieSettings";
import cn from "classnames";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

interface Props {
    category: string;
}

export const SearchParams: React.FC<Props> = ({category}) => {

    const [genre, setGenre ] = useState('')
    const [year, setYear ] = useState('')
    const [country, setCountry ] = useState('')
    const [inputDisabled, setInputDisabled ] = useState(false)
    const [movies, setMovies ] = useState([])

    const [activeConfirm, setActiveConfirm ] = useState(false)

    const yearRef = useRef('');

    const fetchFilms = async () =>  {
        if (!genre && !year && !country && !yearRef.current) return

        const response = await fetch(`https://api.kinopoisk.dev/v1.4/${category}?limit=250${genre ? `&genre.name=${genre}` : ''}${year ? `&year=${year}` : yearRef.current ? `&year=${yearRef.current}` : ''}${country ? `&countries.name=${country}` : ''}`, {

            headers: {
                'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '50J8NSB-09M4XRW-HDWAK1J-EQBTHFT',
                'Accept': 'application/json',
            },
        })

        const data = await response.json()
        setMovies(data.docs)
        return console.log(data)
    }

    const handleCustomYear = (year: string) => {
        yearRef.current = year
        console.log(yearRef)
    }

    const handleClearOption = () => {
        setGenre('')
        setYear('')
        setCountry('')

        setMovies([])
        dispatch({
            type: 'SET_OPTIONS',
            payload: {
                movies: movies,
                loading: false
            }
        })
    }

    useEffect(() => {
        fetchFilms()
    }, [activeConfirm])

    useEffect(() => {
        year ? setInputDisabled(true) : setInputDisabled(false)
    }, [year]);


    const dispatch = useDispatch()

    const handleConfirmBtn = () => {
        setActiveConfirm(!activeConfirm)

        dispatch({
            type: 'SET_OPTIONS',
            payload: {
                movies: movies,
                loading: false
            }
        })
    }

    return (
        <div className={styles.settings}>
        <div className={styles.genresContainer}>
            <div className={styles.genresBox}>
                <button className={styles.optionTitle}>Жанр</button>
                <div className={styles.list}>
                    {(
                        movieSettings.map((genreItem) =>
                            (
                                <button onClick={() => setGenre(genreItem.value)}
                                        className={cn(styles.genre, genre === genreItem.value ? styles.active : null)}
                                        key={genreItem.value}>{genreItem.label}</button>
                            ))
                    )}
                </div>
            </div>
            <div className={styles.genresBox}>
                <button className={styles.optionTitle}>
                    Годы
                </button>
                <div className={styles.list}>
                    {(
                        movieYears.map((yearItem) => (
                            <button onClick={() => setYear(yearItem.value)}
                                    className={cn(styles.genre, year === yearItem.value ? styles.active : null)}
                                    key={yearItem.index}>{yearItem.value}</button>
                        ))
                    )}
                    {(<input
                        disabled={inputDisabled}
                        inputMode="numeric"
                        maxLength={4}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault()
                            }
                        }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCustomYear(event.target.value)}
                        className={styles.inputYears} placeholder={'Напиши свой вариант'}/>)}
                </div>
            </div>
            <div className={styles.countriesBox}>
                <button className={styles.optionTitle}>
                    Страна
                </button>
                <div className={styles.list}>
                    {(
                        movieCountries.map((countryItem) => (
                            <button onClick={() => setCountry(countryItem.value)}
                                    className={cn(styles.genre, country === countryItem.value ? styles.active : null)}
                                    key={countryItem.index}>{countryItem.value}</button>
                        ))
                    )}
                </div>
            </div>
        </div>
        <div className={styles.confirmBtnBox}>
            <button className={styles.confirmBtn} onClick={() => {
                handleClearOption()
            }}>Сбросить
            </button>
            <button className={styles.confirmBtn} onClick={() => {
                handleConfirmBtn()
            }}>Подтвердить
            </button>
        </div>
    </div>
    )
}