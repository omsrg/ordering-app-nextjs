import Image from 'next/image';
import UnstyledLink from '@/components/Links/UnstyledLink';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);

    return (
        <section className='bg-primary-500'>
            <div className='layout h-[80px] flex items-center justify-between sticky top-0 z-20'>
                <div className='md:w-3/12'>
                    <UnstyledLink href='/'>
                        <h1 className='text-4xl lg:text-6xl text-primary-400 font-kanit'>
                            Pizza
                        </h1>
                    </UnstyledLink>
                </div>

                <div className='md:w-6/12 hidden md:block'>
                    <ul className='flex items-center justify-center text-white divide-x'>
                        {links.map(({ href, label }) => (
                            <li key={`${href}${label}`}>
                                <UnstyledLink
                                    href={href}
                                    className={clsx(
                                        'transition-colors menu-hover mx-4',
                                        'font-medium text-lg hover:text-primary-400'
                                    )}
                                >
                                    {label}
                                </UnstyledLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='md:w-3/12 flex justify-end items-center'>
                    <div className='relative mx-8'>
                        <UnstyledLink href='/cart'>
                            <Image
                                src='/images/cart.png'
                                alt=''
                                width='30px'
                                height='30px'
                            />
                            <span className='absolute flex items-center justify-center -top-[10px] -right-[10px] w-[20px] h-[20px] rounded-full bg-white font-bold text-primary-500'>
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
    { href: '#menu', label: 'Menu' },
    { href: '/track', label: 'Track Order' },
];

export default Navbar;
