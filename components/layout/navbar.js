import Link from 'next/link';

import {useEffect, useState } from "react";

const Navbar = () => {
    const [current, setCurrent] = useState('');

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    return ( 
        <nav>
            <div className="name">
                <Link href="/">
                    <a className={`nav-link text-white ${current === '/blog/create' && 'active'}`}>Lewis Jelfs</a>
                </Link>
            </div>
                <Link href="/blog/create">
                    <a className={`nav-link text-white ${current === '/' && 'active'}`}>Write a blog</a>
                </Link>
        </nav>
     );
}
 
export default Navbar;
