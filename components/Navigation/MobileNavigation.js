import UnstyledLink from '../Links/UnstyledLink';
import NavLinks from './NavLinks';

const MobileNavigation = ({ closeMenu }) => {
    return (
        <nav className='fixed top-[80px] py-4 z-30 w-full flex flex-col items-center justify-center md:hidden bg-black/80'>
            <ul className='space-y-6 text-white text-left' onClick={closeMenu}>
                <NavLinks />
            </ul>
            <UnstyledLink
                href='/admin/login'
                className='text-white font-light mt-8 text-sm underline'
                onClick={closeMenu}
            >
                Login as admin
            </UnstyledLink>
        </nav>
    );
};

export default MobileNavigation;
