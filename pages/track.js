import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import LoadingSpinner from '@/components/LoadingSpinner';
import OrderStatus from '@/components/Section/OrderStatus';

const TrackOrderPage = () => {
    const [orderData, setOrderData] = useState({});
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef();

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
        <section className='relative bg-white mt-[80px]'>
            {isLoading && <LoadingSpinner />}

            <div className='layout py-32 min-h-screen'>
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

                {!(Object.keys(orderData).length === 0) && (
                    <div className='mt-6 mx-auto w-max flex text-dark bg-gray-200 p-4 rounded-md'>
                        <div className='flex flex-col text-right'>
                            <p>Order id :</p>
                            <p>Customer :</p>
                        </div>

                        <div className='flex flex-col'>
                            <span className='ml-2'>{orderData._id}</span>
                            <span className='ml-2'>{orderData.customer}</span>
                        </div>
                    </div>
                )}

                {!(Object.keys(orderData).length === 0) && (
                    <div className='md:w-[70%] flex justify-between mt-14 mx-auto'>
                        <OrderStatus status={orderData.status} />
                    </div>
                )}
            </div>

            {isError && (
                <div className='absolute bg-red-300 w-48 top-10 left-[calc(50%_-_6rem)] py-2 rounded-md shadow-md flex justify-center'>
                    <span className='text-red-700'>Order not found!</span>
                </div>
            )}
        </section>
    );
};

export default TrackOrderPage;
