import styles from "./MoviesCarousel.module.scss";
import {Text} from "@/ui/Text/Text";
import {DoubleRightOutlined, DownOutlined, LeftCircleOutlined, RightCircleOutlined} from "@ant-design/icons";
import Carousel from "react-multi-carousel";
import {FilmCard} from "@/ui/FilmCard/FilmCard";
import {useState} from "react";
import {Movie} from "@/app/api/popularMovies";
import {carouselResponsive} from "@/app/shared/constants/constants";
import {useMedia} from "@/app/shared/hooks/useMedia";

interface Props {
    isLoading: boolean
    error: string | null
    movies: Movie[]
    title?: string
}



export const MoviesCarousel: React.FC<Props> = ({ isLoading, error, movies, title}) => {

    const {isMobile} = useMedia()

    return (
        <div className={styles.moviesList}>
            {isLoading ? (
                <div className={styles.carouselSkeleton}>

                </div>
            ) : error ? (
                <Text color="danger">{error}</Text>
            ) : (<div className={styles.carousel}>
                <div className={styles.category}>
                    <h3 className={styles.categoryText}>{title}</h3>
                    <DoubleRightOutlined style={{fontSize: isMobile ? '24px' : '32px'}}/>
                </div>
                {error ? (<Text>{error}</Text>) :
                    <Carousel className={styles.carouselWrapper}
                              responsive={carouselResponsive}
                              infinite={true}
                              autoPlay={true}
                              autoPlaySpeed={2000}
                              transitionDuration={500}
                              containerClass={styles.carouselContainer}
                              itemClass={styles.carouselItem}
                              dotListClass={styles.carouseDotList}
                              customLeftArrow={<LeftCircleOutlined className={styles.arrowLeft}
                                                                   style={{fontSize: '40px'}}/>}
                              customRightArrow={<RightCircleOutlined className={styles.arrowRight}
                                                                     style={{fontSize: '40px'}}/>}
                              removeArrowOnDeviceType={['tablet', 'mobile']}
                              arrows={true}
                              renderButtonGroupOutside={true}
                              partialVisible={false}
                              ssr={true}>
                        {movies?.map((movie) => {
                            if (movie.poster?.url && movie.name) {
                                return (
                                    <FilmCard key={movie.id}
                                              id={movie.id}
                                              rate={movie.rating.kp}
                                              image={movie.poster?.url || 'https://via.placeholder.com/300x450'}
                                              name={movie.name}
                                              country={movie.countries[0]?.name}
                                              genres={movie.genres[0]?.name}
                                              year={movie.year}
                                              series={movie.seriesLength ?? undefined}
                                              type={movie.type}
                                              description={movie.description}
                                    />
                                )
                            }
                        })}
                    </Carousel>
                }
            </div>)}
        </div>

    )
}