import UnstyledLink from '@/components/Links/UnstyledLink';
import clsx from 'clsx';

import { MdHome, MdMenuBook, MdDeliveryDining } from 'react-icons/md';

const NavLinks = () => {
    return (
        <>
            {links.map(({ href, label }) => (
                <li key={`${href}${label}`}>
                    <UnstyledLink
                        href={href}
                        className={clsx(
                            'flex items-center',
                            'transition-colors menu-hover mx-4',
                            'font-medium text-base md:text-lg hover:text-primary-400'
                        )}
                    >
                        <span className='md:hidden mr-2'>
                            {label === 'Home' && <MdHome />}
                            {label === 'Menu' && <MdMenuBook />}
                            {label === 'Track Order' && <MdDeliveryDining />}
                        </span>
                        {label}
                    </UnstyledLink>
                </li>
            ))}
        </>
    );
};

const links = [
    { href: '/', label: 'Home' },
    { href: '#menu', label: 'Menu' },
    { href: '/track', label: 'Track Order' },
];

export default NavLinks;
