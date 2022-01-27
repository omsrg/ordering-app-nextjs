import Image from 'next/image';
import axios from 'axios';

const Order = ({ order }) => {
    const status = order.status;

    const statusClass = (index) => {
        if (index - status < 1) return 'done';
        if (index - status === 1) return 'in-progress';
        if (index - status > 1) return 'undone';
    };

    return (
        <section className='bg-white max-w-screen-2xl py-10'>
            <div className='layout h-128 bg-white flex flex-col gap-4 lg:flex-row md:items-center lg:items-start'>
                {/* left side */}
                <div className='w-full lg:w-9/12'>
                    <div className='overflow-auto'>
                        <table className='w-full text-left'>
                            <thead className='bg-gray-200'>
                                <tr className='text-dark text-left'>
                                    <th className='p-3 w-32 tracking-wider'>
                                        Order ID
                                    </th>
                                    <th className='p-3 w-20 tracking-wider'>
                                        Customer
                                    </th>
                                    <th className='p-3 w-20 tracking-wider'>
                                        Address
                                    </th>
                                    <th className='p-3 w-10 tracking-wider'>
                                        Total
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr className='text-dark odd:bg-gray-100 even:bg-gray-200'>
                                    <td className='p-3'>
                                        <span className=''>{order._id}</span>
                                    </td>
                                    <td className='p-3'>
                                        <span className=''>
                                            {order.customer}
                                        </span>
                                    </td>
                                    <td className='p-3'>
                                        <span className=''>
                                            {order.address}
                                        </span>
                                    </td>
                                    <td className='p-3'>
                                        <span className=''>${order.total}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='md:w-[80%] flex justify-between mb-8 mt-10 lg:mt-20'>
                        {/* payment */}
                        <div className={statusClass(0)}>
                            <Image
                                src='/images/paid.png'
                                width={30}
                                height={30}
                                alt=''
                            />
                            <span className='text-sm md:text-base'>
                                Payment
                            </span>
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
                            <span className='text-sm md:text-base'>
                                Preparing
                            </span>
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
                            <span className='text-sm md:text-base'>
                                On the way
                            </span>
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
                            <span className='text-sm md:text-base'>
                                Delivered
                            </span>
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

                {/* right side */}
                <div className='w-full md:w-6/12 lg:w-3/12'>
                    <div className=' bg-dark p-4 flex flex-col justify-between text-white'>
                        <h2 className=''>CART TOTAL</h2>

                        <div className=''>
                            <b className='mr-2'>Subtotal:</b>${order.total}
                        </div>

                        <div className=''>
                            <b className='mr-2'>Discount:</b>$0.00
                        </div>

                        <div className=''>
                            <b className='mr-2'>Total:</b>${order.total}
                        </div>

                        <button
                            disabled
                            className='bg-white py-2 px-8 mt-2 cursor-not-allowed text-teal-500'
                        >
                            {order.status === 1 ? (
                                <span>PAID</span>
                            ) : (
                                <span>CASH</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export const getServerSideProps = async ({ params }) => {
    const response = await axios.get(
        `${process.env.SITE_URL}/api/orders/${params.id}`
    );

    return {
        props: {
            order: response.data,
        },
    };
};

export default Order;
