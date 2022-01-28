import NavLinks from './NavLinks';

const Navbar = () => {
    return (
        <>
            <div className='md:w-6/12 hidden md:block'>
                <ul className='flex items-center justify-center text-white divide-x'>
                    <NavLinks />
                </ul>
            </div>
        </>
    );
};

export default Navbar;
