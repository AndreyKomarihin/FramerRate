'use client'
import styles from "./Header.module.scss";
import Image from "next/image";
import {
    DownCircleOutlined,
    DownOutlined,
    DownSquareOutlined,
    HeartOutlined,
    SearchOutlined, UpCircleOutlined,
    UpOutlined,
    UpSquareOutlined
} from "@ant-design/icons";
import {usePathname} from "next/navigation";
import cn from "classnames";
import {useEffect, useRef, useState} from "react";
import {useMedia} from "@/app/shared/hooks/useMedia";

interface HeaderProps {
    navigate: (route: string) => void;
}
export const Header: React.FC<HeaderProps> = ({navigate}) => {
    const [favoriteCount, setfavoriteCount] = useState(0)
    const [navIsActive, setNavIsActive] = useState(false)
    const { isMobile } = useMedia()


    const pathname = usePathname()

    const activePage = pathname === '/' ? '' : pathname.replace('/', '')

    useEffect(() => {
        setfavoriteCount(Object.keys(localStorage).filter(key => localStorage.getItem(key) === 'favorite').length)

    }, [favoriteCount])

    return (
        <header className={styles.header}>
            <div className={styles.linkContainer}>
            <Image onClick={() => navigate('/')} className={styles.logo} priority height={isMobile ? 60 : 100} width={isMobile ? 80 : 250} src={isMobile ? '/logoIsMobile.jpg' : '/logo.jpg'} alt={'FramerRate'}/>
                <div className={styles.linksBox}>
                    <div className={styles.menuBox} onClick={()=> setNavIsActive(!navIsActive)}>
                        <p className={cn (styles.menuTitle, !navIsActive ? styles.noActiveMenu : null)}>МЕНЮ</p>
                        {navIsActive ? <UpCircleOutlined style={{fontSize: '28px'}} className={styles.arrowHide} /> : <DownCircleOutlined style={{fontSize: '28px', color: !navIsActive ? 'hsla(0, 0%, 100%, .48)' : ''}} className={styles.arrowHide}/>}
                    </div>
                    <ul className={cn (styles.categories, navIsActive ? styles.mobileCategories : styles.categoriesHide)}>
                        <li onClick={() => navigate('/')}><a className={cn(styles.link, activePage === '' ? styles.activeLink : null)}>Главная</a></li>
                        <li onClick={() => navigate('/movies')}><a className={cn(styles.link, activePage === 'movies' ? styles.activeLink : null)}>Фильмы</a></li>
                        <li onClick={() => navigate('/series')}><a className={cn(styles.link, activePage === 'series' ? styles.activeLink : null)}>Сериалы</a></li>
                        <li onClick={() => navigate('/cartoons')}><a className={cn(styles.link, activePage === 'cartoons' ? styles.activeLink : null)}>Мультфильмы</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    {activePage === 'search' ?
                        (<SearchOutlined className={styles.searcIcon} style={{ color: '#fff', fontSize: isMobile ? '30px' :'20px'}}/>) :
                        (<SearchOutlined onClick={() => navigate('/search')} className={styles.searcIcon} style={{ color: 'hsla(0, 0%, 100%, .48)', fontSize: isMobile ? '30px' :'20px'}}/>)
                    }
                    <a onClick={() => navigate('/search')} className={cn(styles.searchText, activePage === 'search' ? styles.activeLink : null)}>Поиск</a>
                </div>
                <div className={styles.favoritesContainer}>
                    <HeartOutlined onClick={() => navigate('/favorites')} className={styles.search} style={{color: activePage === 'favorites' ? '#9f0404' : 'hsla(0, 0%, 100%, .48)', fontSize: '40px'}} />
                    <p className={cn (styles.allFavorites, activePage === 'favorites' ? null : styles.newBorder)}>{favoriteCount}</p>
                </div>
                </div>
        </header>
    )
}