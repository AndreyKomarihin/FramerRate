'use client'
import styles from "./Header.module.scss";
import Image from "next/image";
import {HeartOutlined, SearchOutlined} from "@ant-design/icons";
import {usePathname} from "next/navigation";
import cn from "classnames";

interface HeaderProps {
    navigate: (route: string) => void;
}
export const Header: React.FC<HeaderProps> = ({navigate}) => {
    const pathname = usePathname()

    const activePage = pathname === '/' ? '' : pathname.replace('/', '')

    return (
        <header className={styles.header}>
            <div className={styles.linkContainer}>
            <Image priority height={100} width={250} src={'/logo.jpg'} alt={'FramerRate'}/>
                <ul className={styles.categories}>
                    <li onClick={() => navigate('/')}><a className={cn(styles.link, activePage === '' ? styles.activeLink : null)}>Главная</a></li>
                    <li onClick={() => navigate('/movies')}><a className={cn(styles.link, activePage === 'movies' ? styles.activeLink : null)}>Фильмы</a></li>
                    <li onClick={() => navigate('/series')}><a className={cn(styles.link, activePage === 'series' ? styles.activeLink : null)}>Сериалы</a></li>
                    <li onClick={() => navigate('/cartoons')}><a className={cn(styles.link, activePage === 'cartoons' ? styles.activeLink : null)}>Мультфильмы</a></li>
                </ul>
            </div>

            <div className={styles.searchContainer}>
                <div className={styles.search}>
                    <SearchOutlined className={styles.searchText} style={{ fontSize: '20px'}}/>
                    <a onClick={() => navigate('/search')} className={styles.searchText}>Поиск</a>
                </div>
                <HeartOutlined className={styles.search} style={{ fontSize: '40px'}} />
            </div>

        </header>
    )
}