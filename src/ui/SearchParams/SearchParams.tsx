import styles from "./SearchParams.module.scss";
import {movieCountries, movieSettings, movieYears} from "@/app/shared/constants/movieSettings";
import cn from "classnames";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

interface Props {
    category: 'movie' | 'tv-series' | 'cartoon' | ''
}

export const SearchParams: React.FC<Props> = ({category}) => {

    const [filters, setFilters] = useState({
        genre: '',
        year: '',
        country: '',
        type: category
    })
    const [inputDisabled, setInputDisabled ] = useState(false)
    const [movies, setMovies ] = useState([])

    const [activeConfirm, setActiveConfirm ] = useState(false)
    const [isClearBtn, setIsClearBtn] = useState(false)
    const [inputKey, setInputKey] = useState(0)

    const fetchFilms = async () =>  {

        try {
            const url = new URL(`https://api.kinopoisk.dev/v1.4/movie?limit=250`)
            if (filters.genre) url.searchParams.append('genres.name', filters.genre)
            if (filters.year) url.searchParams.append('year', filters.year)
            if (filters.country) url.searchParams.append('countries.name', filters.country)

        if (category) {
            url.searchParams.append('type', category)
        }

            if (url.toString() === '') return


            const response = await fetch(url.toString(), {
                    headers: {
                        'X-API-KEY': process.env.NEXT_PUBLIC_KINO_API_KEY || '698WV0C-47PMN6R-K9H1CZD-MRNW7RB',
                        'Accept': 'application/json',
                    },
                }
            )



                console.log(response)

            const data = await response.json()
                console.log(data)
                setMovies(data.docs)
        dispatch({
            type: 'SET_OPTIONS',
            payload: {
                movies: data.docs,
                loading: false
            }
        })}catch (error) {
            console.log('Ошибка запроса:', error)}
        }


    const handleCustomYear = (year: string) => {
        filters.year = year

    }

    const handleClearOption = () => {
        setFilters({ genre: '', year: '', country: '', type: category })
        setInputKey(inputKey + 1)
        setInputDisabled(false)
        setIsClearBtn(!isClearBtn)
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
    }, [activeConfirm, isClearBtn])

    const dispatch = useDispatch()

    const handleYearSelect = (selectedYear: string) => {
        setFilters(prev => ({ ...prev, year: selectedYear }));
        setInputDisabled(true)
    }

    const handleConfirmBtn = () => {
        setActiveConfirm(!activeConfirm)
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
                                <button onClick={() => setFilters(prev => ({ ...prev, genre: genreItem.value}))}
                                        className={cn(styles.genre, filters.genre === genreItem.value ? styles.active : null)}
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
                            <button onClick={() => handleYearSelect(yearItem.value)}
                                    className={cn(styles.genre, filters.year === yearItem.value ? styles.active : null)}
                                    key={yearItem.index}>{yearItem.value}</button>
                        ))
                    )}
                    {(<input
                        key={inputKey}
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
                            <button onClick={() => setFilters(prev => ({...prev, country: countryItem.value}))}
                                    className={cn(styles.genre, filters.country === countryItem.value ? styles.active : null)}
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