import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const OrderDetail = ({ total, createOrder, onCancel }) => {
    const [customer, setCustomer] = useState('');
    const [address, setAddress] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        createOrder({ customer, address, total, method: 0 });
    };

    return (
        <div className='absolute w-full h-full flex items-center justify-center top-0 left-0 bg-black bg-opacity-75 z-[100]'>
            <form className='relative w-[500px] bg-gray-100 rounded-md px-6 py-8 z-[100] text-dark'>
                <div
                    className='absolute top-2 right-2 cursor-pointer'
                    onClick={onCancel}
                >
                    <FaTimes className='w-6 h-6' />
                </div>
                <h1 className='text-xl mb-4 text-center'>
                    you will pay for: ${total}
                </h1>

                <div className='mt-1'>
                    <label htmlFor='name' className='text-left block'>
                        Name
                    </label>
                    <div className='mt-1'>
                        <input
                            type='text'
                            placeholder='John Doe'
                            className='w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                            onChange={(e) => setCustomer(e.target.value)}
                        />
                    </div>
                </div>

                <div className='mt-1'>
                    <label htmlFor='phone'>Phone</label>
                    <div>
                        <input
                            type='number'
                            placeholder='0123 456 789'
                            className='w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                        />
                    </div>
                </div>

                <div className='mt-1'>
                    <label htmlFor='address'>Address</label>
                    <div>
                        <input
                            type='text'
                            placeholder='St. Grand Street, NY 1002'
                            className='w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>

                <div className='mt-6'>
                    <button
                        onClick={handleClick}
                        className='py-2 px-4 bg-primary-500 w-full rounded-lg hover:bg-primary-100'
                    >
                        Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderDetail;
