'use client'
import styles from "./Header.module.scss";
import Image from "next/image";
import {HeartOutlined, SearchOutlined} from "@ant-design/icons";
import {usePathname} from "next/navigation";
import cn from "classnames";
import {useEffect, useRef, useState} from "react";

interface HeaderProps {
    navigate: (route: string) => void;
}
export const Header: React.FC<HeaderProps> = ({navigate}) => {
    const [favoriteCount, setfavoriteCount] = useState(0)


    const pathname = usePathname()

    const activePage = pathname === '/' ? '' : pathname.replace('/', '')

    useEffect(() => {
        setfavoriteCount(Object.keys(localStorage).filter(key => localStorage.getItem(key) === 'favorite').length)

    }, [favoriteCount])



    return (
        <header className={styles.header}>
            <div className={styles.linkContainer}>
            <Image onClick={() => navigate('/')} className={styles.logo} priority height={100} width={250} src={'/logo.jpg'} alt={'FramerRate'}/>
                <ul className={styles.categories}>
                    <li onClick={() => navigate('/')}><a className={cn(styles.link, activePage === '' ? styles.activeLink : null)}>Главная</a></li>
                    <li onClick={() => navigate('/movies')}><a className={cn(styles.link, activePage === 'movies' ? styles.activeLink : null)}>Фильмы</a></li>
                    <li onClick={() => navigate('/series')}><a className={cn(styles.link, activePage === 'series' ? styles.activeLink : null)}>Сериалы</a></li>
                    <li onClick={() => navigate('/cartoons')}><a className={cn(styles.link, activePage === 'cartoons' ? styles.activeLink : null)}>Мультфильмы</a></li>
                </ul>
            </div>
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    {activePage ?
                        (<SearchOutlined className={styles.searchText} style={{ color: '#fff', fontSize: '20px'}}/>) :
                        (<SearchOutlined className={styles.searchText} style={{ color: 'hsla(0, 0%, 100%, .48)', fontSize: '20px'}}/>)
                    }
                    <a onClick={() => navigate('/search')} className={cn(styles.searchText, activePage === 'search' ? styles.activeLink : null)}>Поиск</a>
                </div>
                <div className={styles.favoritesContainer}>
                    <HeartOutlined onClick={() => navigate('/favorites')} className={styles.search} style={{color: activePage === 'favorites' ? '#fff' : 'hsla(0, 0%, 100%, .48)', fontSize: '40px'}} />
                    <p className={styles.allFavorites}>{favoriteCount}</p>
                </div>
                </div>
        </header>
    )
}