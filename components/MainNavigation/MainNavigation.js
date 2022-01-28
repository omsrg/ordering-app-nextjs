// import Image from 'next/image';
import UnstyledLink from '@/components/Links/UnstyledLink';
import { CgMenuRight } from 'react-icons/cg';
import { BsArrowLeft, BsCart3 } from 'react-icons/bs';
import Navbar from './Navbar';
import MobileNavigation from './MobileNavigation';

import { useSelector } from 'react-redux';
import { useState } from 'react';

const MainNavigation = () => {
    const quantity = useSelector((state) => state.cart.quantity);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className='relative bg-primary-500'>
            <div className='layout h-[80px] flex items-center justify-between sticky top-0 z-20'>
                <div className='md:w-3/12'>
                    <UnstyledLink href='/'>
                        <h1 className='text-4xl lg:text-6xl text-primary-400 font-kanit'>
                            Pizza
                        </h1>
                    </UnstyledLink>
                </div>

                <Navbar />

                <div className='flex'>
                    <div className='relative mx-8'>
                        <UnstyledLink href='/cart'>
                            <BsCart3 className='relative text-white w-7 h-7' />
                            <span className='absolute flex items-center justify-center -top-[10px] -right-[10px] w-[20px] h-[20px] rounded-full bg-white font-bold text-primary-500'>
                                {quantity}
                            </span>
                        </UnstyledLink>
                    </div>
                    <div
                        className='cursor-pointer text-white md:hidden'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <BsArrowLeft className='w-8 h-8' />
                        ) : (
                            <CgMenuRight className='w-8 h-8' />
                        )}
                    </div>
                </div>
                <UnstyledLink
                    href='/admin/login'
                    className='text-white font-light text-sm hover:underline hidden md:block'
                >
                    Login as admin
                </UnstyledLink>
            </div>
            {isOpen && (
                <MobileNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
            )}
        </section>
    );
};

export default MainNavigation;
