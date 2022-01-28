import NavLinks from './NavLinks';

const MobileNavigation = ({ setIsOpen }) => {
    return (
        <div
            className='absolute top-[80px] left-0 bottom-0 w-full h-screen bg-black  bg-opacity-50 flex z-[800] md:hidden'
            onClick={() => setIsOpen(false)}
        >
            <nav className='absolute py-4  w-full flex justify-center bg-black bg-opacity-50'>
                <ul className='space-y-6 text-white text-left'>
                    <NavLinks />
                </ul>
            </nav>
        </div>
    );
};

export default MobileNavigation;
