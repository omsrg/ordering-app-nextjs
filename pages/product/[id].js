import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import axios from 'axios';
import { GiFullPizza } from 'react-icons/gi';
import { useCartContext } from '@/context/CartContext';

const Product = ({ pizza }) => {
    const { image, title, desc, prices, extraOptions } = pizza.product;

    const { dispatch } = useCartContext();

    const sizes = ['small', 'medium', 'large'];
    const [size, setSize] = useState(0);
    const [chosenSize, setChosenSize] = useState(0);
    const [price, setPrice] = useState(prices[0]);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);

    const changePrice = (number) => {
        setPrice((prevPrice) => prevPrice + number);
    };

    const handleSize = (sizeIndex) => {
        const difference = prices[sizeIndex] - prices[size];
        setSize(sizeIndex);
        changePrice(difference);
        setChosenSize(sizeIndex);
    };

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if (checked) {
            setExtras((prev) => [...prev, option]);
            changePrice(option.price);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };

    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_PRODUCT',
            payload: { ...pizza, extras, price, quantity },
        });
    };

    return (
        <section className='max-w-screen-2xl mt-[80px]'>
            <div className='layout md:h-screen grid md:grid-cols-2 md:gap-10 py-10'>
                <div className='w-full mb-4'>
                    <div className='w-full'>
                        <Image
                            src={image}
                            objectFit='cover'
                            alt={title}
                            width={650}
                            height={355}
                        />
                    </div>
                </div>

                <div className='flex flex-col text-white'>
                    <h1 className='text-lg md:text-3xl'>{title}</h1>
                    <span className='text-lg md:text-2xl text-primary-400 font-normal underline underline-offset-4 '>
                        ${price}
                    </span>
                    <p className='py-2'>{desc}</p>
                    <h3 className='text-base pt-2'>Choose the size:</h3>

                    <div className='flex flex-wrap'>
                        {sizes.map((size, idx) => (
                            <div
                                key={idx}
                                className='self-end flex flex-col items-center mr-6 md:mr-8 cursor-pointer'
                                onClick={() => handleSize(idx)}
                            >
                                <GiFullPizza
                                    className={clsx(
                                        idx === chosenSize &&
                                            'text-primary-400',
                                        size === 'small' && 'w-8 h-8',
                                        size === 'medium' && 'w-10 h-10',
                                        size === 'large' && 'w-12 h-12'
                                    )}
                                />
                                <span
                                    className={clsx(
                                        'text-sm lg:text-base font-semibold text-dark bg-white px-4 mt-2 rounded-full',
                                        idx === chosenSize && 'bg-primary-400'
                                    )}
                                >
                                    {size}
                                </span>
                            </div>
                        ))}
                    </div>

                    <h3 className='text-base pt-4 pb-2'>
                        Choose additional ingredients:{' '}
                    </h3>
                    <div className='flex flex-wrap mb-8'>
                        {extraOptions.map((option) => (
                            <div
                                key={option._id}
                                className='option flex items-center mr-2 font-medium'
                            >
                                <input
                                    className='mr-1 w-[15px] h-[15px] cursor-pointer appearane-none block checked:text-primary-400 focus:outline-primary-400'
                                    type='checkbox'
                                    id={option.text}
                                    name={option.text}
                                    onChange={(e) => handleChange(e, option)}
                                />
                                <label
                                    htmlFor={option.text}
                                    className='text-sm'
                                >
                                    {option.text}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className='flex flex-wrap items-center'>
                        <div className='mr-4 my-4'>
                            <span>Quantity: </span>
                            <input
                                type='number'
                                defaultValue={1}
                                onChange={(e) => setQuantity(e.target.value)}
                                className='w-[70px] h-[30px] focus:border-none text-dark appearance-none'
                            />
                        </div>
                        <button className='button ' onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const getServerSideProps = async ({ params }) => {
    const response = await axios.get(
        `${process.env.SITE_URL}/api/products/${params.id}`
    );

    return {
        props: {
            pizza: response.data,
        },
    };
};

export default Product;
