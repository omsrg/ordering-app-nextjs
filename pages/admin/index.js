import Image from 'next/image';
import axios from 'axios';
import AddProduct from '@/components/AddProduct';
import AddButton from '@/components/AddButton';
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaAngleDoubleRight } from 'react-icons/fa';
import ModalConfirm from '@/components/ModalConfirm';
import Backdrop from '@/components/Backdrop';
import Loading from '@/components/Loading';

const Index = ({ admin }) => {
    const status = ['preparing', 'on the way', 'delivered'];
    const [pizzaList, setPizzaList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openModalProduct, setOpenModalProduct] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState({
        show: false,
        id: null,
    });

    const fetchingData = async () => {
        setIsLoading(true);
        const [productRes, orderRes] = await axios.all([
            axios.get(`/api/products`),
            axios.get(`/api/orders`),
        ]);
        setPizzaList(productRes.data);
        setOrderList(orderRes.data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchingData();
    }, []);

    const openModalConfirmHandler = (id) => {
        setOpenModalConfirm({ show: true, id });
    };
    const closeModalConfirmHandler = () => {
        setOpenModalConfirm({ show: false, id: null });
    };

    const deleteHandler = async () => {
        setIsLoading(true);
        const { id } = openModalConfirm;
        try {
            const res = await axios.delete('/api/products/' + id);

            if (res.status === 200) {
                setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
                setOpenModalConfirm({ show: false, id: null });
                setIsLoading(false);
            }
        } catch (error) {
            // console.log(error);
        }
    };

    const handleStatus = async (id) => {
        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        try {
            const res = await axios.put('/api/orders/' + id, {
                status: currentStatus + 1,
            });
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id),
            ]);
            // console.log(res);
        } catch (error) {
            // console.log('failed change status', error);
        }
    };

    return (
        <section className='bg-white max-w-screen-2xl py-10'>
            {isLoading && <Loading />}
            {admin && <AddButton setOpenModal={setOpenModalProduct} />}
            {openModalProduct && (
                <AddProduct setOpenModal={setOpenModalProduct} />
            )}

            {openModalConfirm.show && (
                <ModalConfirm
                    onCancel={closeModalConfirmHandler}
                    onConfirm={deleteHandler}
                />
            )}
            {openModalConfirm.show && (
                <Backdrop onCancel={closeModalConfirmHandler} />
            )}
            <div className='layout bg-white flex flex-col gap-4 py-10'>
                <div className='w-full lg:w-10/12 overflow-auto'>
                    <h1 className='text-3xl'>Products</h1>
                    <table className='w-full table-auto mt-4'>
                        <thead className='bg-gray-200'>
                            <tr className='text-dark text-left'>
                                <th className='p-1 w-10 tracking-wider'>
                                    Image
                                </th>
                                <th className='p-1 w-32 tracking-wider'>Id</th>
                                <th className='p-1 w-20 tracking-wider'>
                                    Product name
                                </th>
                                <th className='p-1 w-10 tracking-wider'>
                                    Price
                                </th>
                                <th className='p-1 w-20 tracking-wider'>
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {pizzaList &&
                                pizzaList.map((product) => (
                                    <tr
                                        key={product._id}
                                        className='odd:bg-gray-100 even:bg-gray-200'
                                    >
                                        <td className='p-1'>
                                            <Image
                                                src={product.image}
                                                width={50}
                                                height={50}
                                                objectFit='cover'
                                                alt={`an image of ${product.title}`}
                                            />
                                        </td>
                                        <td className='p-1'>{product._id}</td>
                                        <td className='p-1'>{product.title}</td>
                                        <td className='p-1'>
                                            ${product.prices[0]}
                                        </td>
                                        <td className='p-1 flex items-center'>
                                            <button className='bg-emerald-500 hover:bg-emerald-400 px-2 py-1 mr-3 rounded-sm flex'>
                                                <div className='flex items-center space-x-2 text-dark'>
                                                    <FaEdit />
                                                    <span>Edit</span>
                                                </div>
                                            </button>

                                            <button
                                                className='bg-red-500 px-2 py-1 rounded-sm hover:bg-red-400'
                                                onClick={() =>
                                                    openModalConfirmHandler(
                                                        product._id
                                                    )
                                                }
                                            >
                                                <div className='flex items-center space-x-2 text-dark'>
                                                    <FaTrash />
                                                    <span>Delete</span>
                                                </div>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                <div className='w-full mt-10 overflow-auto'>
                    <h1 className='text-3xl'>Orders</h1>
                    <table className='w-full table-auto mt-4'>
                        <thead className='bg-gray-200'>
                            <tr className='text-dark text-left'>
                                <th className='p-1 w-20 tracking-wider'>Id</th>
                                <th className='p-1 w-16 tracking-wider'>
                                    Customer
                                </th>
                                <th className='p-1 w-10 tracking-wider'>
                                    Total
                                </th>
                                <th className='p-1 w-10 tracking-wider'>
                                    Payment
                                </th>
                                <th className='p-1 w-10 tracking-wider'>
                                    Status
                                </th>
                                <th className='p-1 w-20 tracking-wider'>
                                    Action
                                </th>
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
                                        <td className='p-1'>
                                            {order.customer}
                                        </td>
                                        <td className='p-1'>${order.total}</td>
                                        <td className='p-1'>
                                            {order.method === 0 ? (
                                                <span>cash</span>
                                            ) : (
                                                <span>paid</span>
                                            )}
                                        </td>
                                        <td className='p-1'>
                                            {status[order.status]}
                                        </td>
                                        <td className='p-1'>
                                            <button
                                                className='bg-emerald-500 px-2 py-1 rounded-sm'
                                                onClick={() =>
                                                    handleStatus(order._id)
                                                }
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
                </div>
            </div>
        </section>
    );
};

export const getServerSideProps = async (context) => {
    const myCookie = context.req?.cookies || '';
    let admin = false;

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false,
            },
        };
    } else {
        admin = true;
    }

    return {
        props: {
            admin,
        },
    };
};

export default Index;
