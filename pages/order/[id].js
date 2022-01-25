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
        <div className='p4 flex'>
            {/* left side */}
            <div className='left w-9/12 mt-10'>
                <div className='row'>
                    <table className='w-full text-left mb-4'>
                        <tbody>
                            <tr className=''>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Total</th>
                            </tr>
                        </tbody>

                        <tbody>
                            <tr className='tr'>
                                <td>
                                    <span className=''>{order._id}</span>
                                </td>
                                <td>
                                    <span className=''>{order.customer}</span>
                                </td>
                                <td>
                                    <span className=''>{order.address}</span>
                                </td>
                                <td>
                                    <span className=''>${order.total}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='w-[80%] flex justify-between'>
                    {/* payment */}
                    <div className={statusClass(0)}>
                        <Image
                            src='/images/paid.png'
                            width={30}
                            height={30}
                            alt=''
                        />
                        <span>Payment</span>
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
                        <span>Preparing</span>
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
                        <span>On the way</span>
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
                        <span>Delivered</span>
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
            <div className='right w-3/12'>
                <div className='w-[90%] max-w-[300px] bg-[#333] p-4 m-10 flex flex-col justify-between text-white'>
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
                        PAID
                    </button>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ params }) => {
    const response = await axios.get(
        `http://localhost:3000/api/orders/${params.id}`
    );

    return {
        props: {
            order: response.data,
        },
    };
};

export default Order;
