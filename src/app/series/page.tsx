'use client'

import {Header} from "@/components/Header/Header";
import {useRouter} from "next/navigation";

export default function Movies () {

    const router = useRouter()

    const handleNavigate = (route:string) => {
        router.push(route)
    }

    return (
        <>
            <Header navigate = {handleNavigate}/>
        </>
)
}