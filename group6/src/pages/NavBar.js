import { useRouter } from 'next/router';
import Link from 'next/link';

const NavBar = () => {
    const router = useRouter();

    return (
        <nav className="top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white mb-0"> {}
            <div className="flex items-center justify-center w-full">
                <div className="flex justify-evenly w-full max-w-5xl">
                    <Link href="/" passHref>
                        <div className={`${router.pathname === '/' ? 'font-bold' : ''}`}>Home</div>
                    </Link>
                    <Link href="/about-us" passHref>
                        <div className={`${router.pathname === '/about-us' ? 'font-bold' : ''}`}>About</div>
                    </Link>
                    <Link href="/refugee-testimonials" passHref>
                        <div className={`${router.pathname === '/refugee-testimonials' ? 'font-bold' : ''}`}>Refugee Testimonials</div>
                    </Link>
                    <Link href="/news-and-media" passHref>
                        <div className={`${router.pathname === '/news-and-media' ? 'font-bold' : ''}`}>News and Media</div>
                    </Link>
                    <Link href="/support-groups" passHref>
                        <div className={`${router.pathname === '/support-groups' ? 'font-bold' : ''}`}>Support Groups</div>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;