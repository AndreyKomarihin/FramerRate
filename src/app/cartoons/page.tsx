'use client'

import {Header} from "@/components/Header/Header";
import {useRouter} from "next/navigation";
import {SearchingParamsPage} from "@/widgets/SearchingParamsPage/SearchingParamsPage";

export default function Cartoons () {
    const router = useRouter()


    return (
        <>
            <Header navigate = {(route) => router.push(route)}/>
            <SearchingParamsPage type={'cartoon'}/>
        </>
)
}