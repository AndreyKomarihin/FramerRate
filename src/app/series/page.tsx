'use client'

import {Header} from "@/components/Header/Header";
import {useRouter} from "next/navigation";
import {SearchParams} from "@/ui/SearchParams/SearchParams";
import {SearchingParamsPage} from "@/widgets/SearchingParamsPage/SearchingParamsPage";

export default function Series () {
    const router = useRouter()


    return (
        <>
            <Header navigate = {(route) => router.push(route)}/>
            <main>
                <SearchingParamsPage type={'tv-series'}/>
            </main>
        </>
)
}