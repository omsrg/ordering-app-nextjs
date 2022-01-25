import Image from 'next/image';
import UnstyledLink from '@/components/Links/UnstyledLink';
import clsx from 'clsx';

import { useSelector } from 'react-redux';

// const links = [
//     { href: '/', label: 'Route' },
//     { href: '/', label: 'Route' },
// ];

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);

    return (
        <section className='bg-primary-500'>
            <div className='layout h-[80px] flex items-center justify-between sticky top-0 z-20'>
                <div className='w-3/12 flex items-center'>
                    <div className='bg-white rounded-full p-4 w-[50px] h-[50px]'>
                        <Image
                            src='/images/telephone.png'
                            alt=''
                            width='32'
                            height='32'
                        />
                    </div>
                    <div className='ml-4 text-white'>
                        <p className='text-l font-medium text-white'>
                            ORDER NOW
                        </p>
                        <p className='text-xl font-bold'>012 345 678</p>
                    </div>
                </div>

                <div className='w-6/12 hidden md:block'>
                    <ul className='flex items-center justify-center text-white space-x-2'>
                        {links.map(({ href, label }) => (
                            <li key={`${href}${label}`}>
                                <UnstyledLink
                                    href={href}
                                    className={clsx(
                                        'transition-colors menu-hover',
                                        'font-medium text-lg hover:text-primary-400',
                                        label === 'Pizza' &&
                                            'text-6xl text-primary-400 font-kanit'
                                    )}
                                >
                                    {label}
                                </UnstyledLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='w-3/12 flex justify-end items-center'>
                    <div className='relative mx-8'>
                        <UnstyledLink href='/cart'>
                            <Image
                                src='/images/cart.png'
                                alt=''
                                width='30px'
                                height='30px'
                            />
                            <span className='absolute flex items-center justify-center -top-[10px] -right-[10px] w-[20px] h-[20px] rounded-full bg-white font-bold text-[#d1411e]'>
                                {quantity}
                            </span>
                        </UnstyledLink>
                    </div>
                    <UnstyledLink
                        href='/admin/login'
                        className='text-white font-light text-sm hover:underline '
                    >
                        Login as admin
                    </UnstyledLink>
                </div>
            </div>
        </section>
    );
};

const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/menu', label: 'Menu' },
    { href: '/', label: 'Pizza' },
    { href: '/events', label: 'Events' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

export default Navbar;
