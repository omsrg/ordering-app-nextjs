import { FaAngleDoubleRight } from 'react-icons/fa';
import clsx from 'clsx';

const TableOrders = ({ orderList, handleStatus }) => {
    const status = ['preparing', 'on the way', 'delivered'];

    return (
        <>
            <table className='w-full table-auto mt-4'>
                <thead className='bg-gray-200'>
                    <tr className='text-dark text-left'>
                        <th className='p-1 w-20 tracking-wider'>Id</th>
                        <th className='p-1 w-16 tracking-wider'>Customer</th>
                        <th className='p-1 w-10 tracking-wider'>Total</th>
                        <th className='p-1 w-10 tracking-wider'>Payment</th>
                        <th className='p-2 w-10 tracking-wider'>Status</th>
                        <th className='p-1 w-20 tracking-wider'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {orderList &&
                        orderList.map((order) => (
                            <tr
                                key={order._id}
                                className='odd:bg-gray-100 even:bg-gray-200'
                            >
                                <td className='p-1'>{order._id}</td>
                                <td className='p-1'>{order.customer}</td>
                                <td className='p-1'>${order.total}</td>
                                <td className='p-1'>
                                    {order.method === 0 ? (
                                        <span>cash</span>
                                    ) : (
                                        <span>paid</span>
                                    )}
                                </td>
                                <td className=''>
                                    <span
                                        className={clsx(
                                            'p-2 py-1 uppercase rounded-md',
                                            order.status === 0 &&
                                                'bg-yellow-200 text-yellow-900',
                                            order.status === 1 &&
                                                'bg-blue-200 text-blue-900',
                                            order.status === 2 &&
                                                'bg-green-200 text-green-900'
                                        )}
                                    >
                                        {status[order.status]}
                                    </span>
                                </td>
                                <td className='p-1'>
                                    <button
                                        className={clsx(
                                            order.status < 2 &&
                                                'bg-primary-500 text-white px-2 py-1 rounded-sm',
                                            order.status >= 2 &&
                                                'bg-primary-100 text-gray-200 px-2 py-1 rounded-sm'
                                        )}
                                        onClick={() => handleStatus(order._id)}
                                        disabled={order.status >= 2}
                                    >
                                        <div className='flex items-center space-x-2'>
                                            <span>Next Stage</span>
                                            <FaAngleDoubleRight />
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default TableOrders;
