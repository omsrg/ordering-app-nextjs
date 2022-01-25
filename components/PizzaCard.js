import Image from 'next/image';
import UnstyledLink from './Links/UnstyledLink';

const PizzaCard = ({ pizza }) => {
    const { _id, title, image, prices, desc } = pizza;
    return (
        <div className='w-1/4 flex flex-col justify-center p-2 border border-primary-400 m-4'>
            <UnstyledLink href={`/product/${_id}`}>
                <Image src={image} alt='' width={500} height={300} />
            </UnstyledLink>
            <div className='mt-6 flex flex-col items-center justify-center'>
                <h1 className='text-lg text-primary-400 text-center'>
                    {title}
                </h1>
                <p className='text-center text-white'>{desc}</p>
                <span className='my-4 text-xl font-bold text-white'>
                    ${prices[0]}
                </span>
                <UnstyledLink href={`/product/${_id}`} className='button'>
                    Click to order
                </UnstyledLink>
            </div>
        </div>
    );
};

export default PizzaCard;
