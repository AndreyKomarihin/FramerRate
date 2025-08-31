import React, { ElementType, HTMLAttributes } from 'react'
import cn from 'classnames'
import styles from './Text.module.scss'

type Props<T extends ElementType> = HTMLAttributes<HTMLDivElement> & {
    as?: T
    type?: 'text' | 'password' | 'email'
    size?: 12 | 16 | 18 | 20 | 24 | 32 | 38 | 50
    bold?: boolean
}

export const Text = <T extends ElementType = 'p'>({
                                                      as,
                                                      className,
                                                      size = 18,
                                                      bold = false,
                                                      ...props
                                                  }: Props<T> & HTMLAttributes<HTMLElement>) => {
    const Tag = as || 'p'

    return (
        <Tag
            className={cn(
                styles.base,
                styles[Tag as string],
                styles[`size_${size}`],
                bold && styles.bold,
                className
            )}
            {...props}
        />
    )
}