import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Cursor.module.css';

const NavBar = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    // Helper function to determine if the link is active
    const isActive = (pathname) => router.pathname === pathname;

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/search?term=${encodeURIComponent(searchQuery)}`);
        setSearchQuery(''); // Clear search input after navigating
    };

    return (
        <nav className="top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white">
            {/* Title on the left */}
            <div className="flex items-center flex-initial">
                <h1 className="text-yellow-400 font-bold text-xl mr-4" style={{ textShadow: '2px 2px 0px #000' }}>
                    Ukraine Crisis
                </h1>
            </div>

            {/* Centered navigation links */}
            <div className="flex items-center justify-center flex-grow">
                <div className="flex justify-center w-auto space-x-4">
                    {['/', '/about-us', '/asylum-countries', '/news', '/support-groups', '/visuals'].map((path, index) => {
                        const text = ['Home', 'About', 'Asylum Countries', 'News and Media', 'Support Groups', 'Visuals'][index];
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

            {/* Search bar on the right */}
            <div className="flex-initial">
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="p-2 rounded-l-md text-black"
                    />
                    <button type="submit" className="bg-blue-500 p-2 rounded-r-md">
                        Search
                    </button>
                </form>
            </div>
        </nav>
    );
};

export default NavBar;
