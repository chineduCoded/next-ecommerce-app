import React from 'react'
import Head from 'next/head'
import styles from "../styles/Home.module.css"
import { useMediaQuery } from '../utils/useMediaQuery'
import { NavbarDesktop } from './NavbarDesktop'
import { NavbarMobile } from './NavbarMobile'



export default function Layout({ title, description, children }) {

    const isMd = useMediaQuery(768)

    return (
        <div className={styles.container}>
            <Head>
                <title>{title ? `${title} - Shoppie` : 'Shoppie'}</title>
                {description && <meta name='description' content={description} />}
            </Head>
            <header className={styles.header}>
                {isMd ? (
                    <NavbarMobile />
                ) : (
                    <NavbarDesktop />
                )}

            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    &copy; {new Date().getFullYear()} All Right Reserved.{' '}
                    <span className={styles.logo}>
                        Elijah Chinedu
                    </span>
                </a>
            </footer>
        </div>
    )
}
