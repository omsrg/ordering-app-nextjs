import MainNavigation from '@/components/Navigation/MainNavigation';
import Footer from '@/components/Section/Footer';

import MobileNavigation from '@/components/Navigation/MobileNavigation';
import { useState, useEffect } from 'react';
import Backdrop from './Modals/Backdrop';

function Layout(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const mobileNavHandler = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    useEffect(() => {
        if (isMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isMenuOpen]);

    return (
        <>
            <MainNavigation
                mobileNavHandler={mobileNavHandler}
                isMenuOpen={isMenuOpen}
            />
            {isMenuOpen && <MobileNavigation closeMenu={mobileNavHandler} />}
            {isMenuOpen && <Backdrop onCancel={mobileNavHandler} />}
            <main className='bg-dark '>{props.children}</main>
            <Footer />
        </>
    );
}

export default Layout;
