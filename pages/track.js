import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Loading from '@/components/Loading';

const TrackOrderPage = () => {
    const [orderData, setOrderData] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const status = orderData.status;
    const inputRef = useRef();

    const statusClass = (index) => {
        if (index - status < 1) return 'done';
        if (index - status === 1) return 'in-progress';
        if (index - status > 1) return 'undone';
    };

    const getOrderData = async () => {
        const enteredId = inputRef.current.value;

        if (enteredId === '') {
            setIsError(true);
            return;
        }
        setIsLoading(true);

        try {
            const response = await axios.get(`/api/orders/${enteredId}`);
            if (response.data === '') {
                setIsError(true);
            }
            setOrderData(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setIsError(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isError]);

    return (
        <section className='relative bg-white'>
            {isLoading && <Loading />}

            <div className='layout py-32'>
                <div className='md:w-9/12 mx-auto flex flex-col items-center'>
                    <div className='w-full relative flex items-center'>
                        <input
                            type='text'
                            placeholder='Please enter your order id...'
                            ref={inputRef}
                            className='w-full rounded-md shadow-lg inline-block border-gray-300 focus:border-gray-300 focus:ring-gray-300'
                        />
                        <button
                            className='absolute right-2'
                            onClick={() => (inputRef.current.value = '')}
                        >
                            <FaTrash className='w-6 h-6  text-gray-400 ' />
                        </button>
                    </div>
                    <button
                        className='py-3 px-6 w-32 mt-6 rounded-md text-white bg-primary-500 hover:bg-primary-100'
                        onClick={getOrderData}
                    >
                        Search
                    </button>
                </div>

                <div className='mt-6 w-5/12 mx-auto flex text-dark bg-gray-200 p-4 rounded-md'>
                    <div className='text-right'>
                        <p>Order id :</p>
                        <p>Customer :</p>
                    </div>

                    <div className='flex flex-col ml-4'>
                        <span>{orderData._id}</span>
                        <span>{orderData.customer}</span>
                    </div>
                </div>

                <div className='md:w-[70%] flex justify-between mt-16 mx-auto'>
                    {/* payment */}
                    <div className={statusClass(0)}>
                        <Image
                            src='/images/paid.png'
                            width={30}
                            height={30}
                            alt=''
                        />
                        <span className='text-sm md:text-base'>Payment</span>
                        <div className='checked-icon'>
                            <Image
                                className=''
                                src='/images/checked.png'
                                width={20}
                                height={20}
                                alt=''
                            />
                        </div>
                    </div>

                    {/* preparing */}
                    <div className={statusClass(1)}>
                        <Image
                            src='/images/bake.png'
                            width={30}
                            height={30}
                            alt=''
                        />
                        <span className='text-sm md:text-base'>Preparing</span>
                        <div className='checked-icon'>
                            <Image
                                className=''
                                src='/images/checked.png'
                                width={20}
                                height={20}
                                alt=''
                            />
                        </div>
                    </div>

                    {/* on the way */}
                    <div className={statusClass(2)}>
                        <Image
                            src='/images/bike.png'
                            width={30}
                            height={30}
                            alt=''
                        />
                        <span className='text-sm md:text-base'>On the way</span>
                        <div className='checked-icon'>
                            <Image
                                className=''
                                src='/images/checked.png'
                                width={20}
                                height={20}
                                alt=''
                            />
                        </div>
                    </div>

                    {/* delivered */}
                    <div className={statusClass(3)}>
                        <Image
                            src='/images/delivered.png'
                            width={30}
                            height={30}
                            alt=''
                        />
                        <span className='text-sm md:text-base'>Delivered</span>
                        <div className='checked-icon'>
                            <Image
                                className=''
                                src='/images/checked.png'
                                width={20}
                                height={20}
                                alt=''
                            />
                        </div>
                    </div>
                </div>
            </div>

            {isError && (
                // orderData ===
                <div className='absolute bg-red-300 w-48 top-10 left-[calc(50%_-_6rem)] py-2 rounded-md shadow-md flex justify-center'>
                    <span className='text-red-700'>Order not found!</span>
                </div>
            )}
        </section>
    );
};

export default TrackOrderPage;
