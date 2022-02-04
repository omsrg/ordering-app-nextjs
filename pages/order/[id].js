import axios from 'axios';
import OrderStatus from '@/components/Section/OrderStatus';

const Order = ({ order }) => {
    return (
        <section className='bg-white max-w-screen-2xl py-32'>
            <div className='layout min-h-screen bg-white flex flex-col gap-4 lg:flex-row md:items-center lg:items-start'>
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

                    <div className='md:w-[80%] flex justify-between mb-8 mt-10 lg:mt-20 mx-auto'>
                        <OrderStatus status={order.status} />
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
