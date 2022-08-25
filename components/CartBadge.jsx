import React from 'react'
import styles from "../styles/Home.module.css"

export const CartBadge = ({ icon, bagdeContent }) => {
    return (
        <div className={styles.bagde}>
            {icon}
            <span className={styles.badgeContent}>{bagdeContent}</span>
        </div>
    )
}
