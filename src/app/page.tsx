'use client'

import {Header} from "@/components/Header/Header";
import {TopMoviesList} from "@/widgets/TopMoviesList/TopMoviesList";
import {usePathname, useRouter} from "next/navigation";
import {RecommendWatching} from "@/widgets/RecommendWatching/RecommendWatching";


export default function Home() {
    const router = useRouter()


  return (

    <>
      <Header navigate = {(route) => router.push(route)}/>
        <main>
            <RecommendWatching/>
            <TopMoviesList/>
        </main>
    </>
  );
}
