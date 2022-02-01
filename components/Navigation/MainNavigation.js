import UnstyledLink from '@/components/Links/UnstyledLink';
import { CgMenuRight } from 'react-icons/cg';
import { BsArrowLeft, BsCart3 } from 'react-icons/bs';
import NavLinks from './NavLinks';

import { useCartContext } from '@/context/CartContext';

const MainNavigation = ({ mobileNavHandler, isMenuOpen }) => {
    const { state } = useCartContext();

    return (
        <header className='w-full h-[80px] fixed bg-primary-500 top-0 z-50'>
            <div className='layout h-[80px] flex items-center justify-between  '>
                <div className='md:w-3/12'>
                    <UnstyledLink href='/'>
                        <h1 className='text-4xl lg:text-6xl text-primary-400 font-kanit'>
                            Pizza
                        </h1>
                    </UnstyledLink>
                </div>

                <div className='md:w-6/12 hidden md:block'>
                    <ul className='flex items-center justify-center text-white divide-x'>
                        <NavLinks />
                    </ul>
                </div>

                <div className='flex'>
                    <div className='relative mx-8'>
                        <UnstyledLink href='/cart'>
                            <BsCart3 className='relative text-white w-7 h-7' />
                            <span className='absolute flex items-center justify-center -top-[10px] -right-[10px] w-[20px] h-[20px] rounded-full bg-white font-bold text-primary-500'>
                                {state.quantity}
                            </span>
                        </UnstyledLink>
                    </div>

                    <UnstyledLink
                        href='/admin/login'
                        className='text-white font-light text-sm hover:underline hidden md:block'
                    >
                        Login as admin
                    </UnstyledLink>

                    <div
                        className='cursor-pointer text-white md:hidden'
                        onClick={mobileNavHandler}
                    >
                        {isMenuOpen ? (
                            <BsArrowLeft className='w-8 h-8' />
                        ) : (
                            <CgMenuRight className='w-8 h-8' />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default MainNavigation;
