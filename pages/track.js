import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

const TrackOrderPage = () => {
    const [orderList, setOrderList] = useState({});
    const status = orderList.status;

    const statusClass = (index) => {
        if (index - status < 1) return 'done';
        if (index - status === 1) return 'in-progress';
        if (index - status > 1) return 'undone';
    };

    // useEffect(() => {
    //     const getOrderData = async (id) => {
    //         try {
    //             const response = await axios.get('/api/orders/' + id);
    //             if (response.status === 201) {
    //                 setOrderList(response.data);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     getOrderData();
    // }, []);

    return (
        <section className='bg-white'>
            <div className='layout h-128 py-20'>
                <div className='w-9/12 mx-auto flex items-center justify-center'>
                    <input
                        name='order-id'
                        type='text'
                        placeholder='input your order id here...'
                        className='w-full ml-4 rounded-md shadow-lg border-gray-300 focus:border-primary-400 focus:ring-primary-400'
                    />
                </div>
                <div className='md:w-[80%] flex justify-between mt-12 mb-8'>
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
        </section>
    );
};

export default TrackOrderPage;
