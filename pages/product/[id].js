import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/cartSlice';
import { GiFullPizza } from 'react-icons/gi';

const Product = ({ pizza }) => {
    const { image, title, desc, prices, extraOptions } = pizza.product;

    const sizes = ['small', 'medium', 'large'];

    const [size, setSize] = useState(0);
    const [chosenSize, setChosenSize] = useState(0);
    const [price, setPrice] = useState(prices[0]);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);

    const dispatch = useDispatch();

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
        dispatch(addProduct({ ...pizza, extras, price, quantity }));
    };

    return (
        <section>
            <div className='layout h-128 flex'>
                <div className='w-6/12 flex items-center justify-center'>
                    <div className='img w-[80%] h-[80%] relative'>
                        <Image
                            src={image}
                            objectFit='contain'
                            layout='fill'
                            alt={title}
                        />
                    </div>
                </div>

                <div className='right w-6/12 flex flex-col justify-center text-white'>
                    <h1 className='text-3xl'>{title}</h1>
                    <span className='text-2xl text-primary-400 font-normal underline underline-offset-4 '>
                        ${price}
                    </span>
                    <p className='py-2'>{desc}</p>
                    <h3 className='text-base pt-2'>Choose the size:</h3>

                    <div className='flex space-x-16'>
                        {sizes.map((size, idx) => (
                            <div
                                key={idx}
                                className='self-end flex flex-col items-center cursor-pointer'
                                onClick={() => handleSize(idx)}
                            >
                                <GiFullPizza
                                    className={clsx(
                                        idx === chosenSize &&
                                            'text-primary-400',
                                        size === 'small' && 'w-10 h-10',
                                        size === 'medium' && 'w-12 h-12',
                                        size === 'large' && 'w-14 h-14'
                                    )}
                                />
                                <span
                                    className={clsx(
                                        'text-base font-semibold text-dark bg-white px-4 mt-2 rounded-full',
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
                    <div className='ingredents flex mb-8'>
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

                    <div className='flex items-center'>
                        <div className=''>
                            <span>Quantity:</span>
                            <input
                                type='number'
                                defaultValue={1}
                                onChange={(e) => setQuantity(e.target.value)}
                                className='w-[70px] h-[30px] focus:border-none text-dark appearance-none'
                            />
                        </div>
                        <button
                            className='button ml-4'
                            onClick={handleAddToCart}
                        >
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
