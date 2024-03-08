import React from 'react'; // Add this line at the top of your file
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Cursor.module.css';

const NavBar = () => {
    const router = useRouter();

    // Helper function to determine if the link is active
    const isActive = (pathname) => router.pathname === pathname;

    return (
        <nav className="top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white mb-0">
            <div className="flex items-center justify-center w-full">
                <div className="flex justify-evenly w-full max-w-5xl">
                    {['/', '/about-us', '/asylum-countries', '/news', '/support-groups'].map((path, index) => {
                        const text = ['Home', 'About', 'Asylum Countries', 'News and Media', 'Support Groups'][index];
                        return (
                            <Link href={path} passHref key={path}>
                                <div className={`${styles.cursorHover} ${isActive(path) ? styles.activeLink : ''}`}>
                                    {text}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
