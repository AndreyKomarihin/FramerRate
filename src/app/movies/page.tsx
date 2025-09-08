'use client'

import {Header} from "@/components/Header/Header";
import {useRouter} from "next/navigation";
import styles from '../../widgets/SearchingParamsPage/movies.module.scss';
import {useEffect, useRef, useState} from "react";
import {fetchPopularContent, Movie} from "@/app/api/popularMovies";
import {movieCountries, movieSettings, movieYears} from "@/app/shared/constants/movieSettings";
import {SelectorMovie} from "@/ui/SelectorMovie/SelectorMovie";
import cn from "classnames";
import {SearchParams} from "@/ui/SearchParams/SearchParams";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {useAppSelector} from "@/app/store/hooks";
import {FilmCard} from "@/ui/FilmCard/FilmCard";
import {SearchState} from "@/app/store/store";
import {SearchingParamsPage} from "@/widgets/SearchingParamsPage/SearchingParamsPage";
import {type} from "node:os";

export default function Movies () {


    const router = useRouter()


    return (
        <>
            <Header navigate = {(route) => router.push(route)}/>
            <main>
                <SearchingParamsPage type={'movie'}/>
            </main>
        </>
    )
}