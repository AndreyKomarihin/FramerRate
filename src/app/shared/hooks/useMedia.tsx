import { useMediaQuery } from './useMediaQuery'

export const useMedia = () => {
    const isMobile = useMediaQuery('(max-width: 768px)') // Small to regular mobile phones
    const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1023px)') // Tablets and larger devices
    const isSmallDesktop = useMediaQuery(
        '(min-width: 1024px) and (max-width: 1200px)'
    )
    const isLargeDesktop = useMediaQuery('(min-width: 1200px)') // Large desktops and monitors

    return {
        isMobile,
        isTablet,
        isSmallDesktop,
        isLargeDesktop,
    }
}
