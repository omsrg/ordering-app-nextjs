import axios from 'axios';
import AddProduct from '@/components/Modals/AddProduct';
import ButtonAddProduct from '@/components/ButtonAddProduct';
import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import TableProducts from '@/components/TableLists/TableProducts';
import TableOrders from '@/components/TableLists/TableOrders';

const Index = ({ admin }) => {
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

    const deleteProductHandler = async () => {
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
            throw new Error('failed deleting data!');
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
        } catch (error) {
            // console.log('failed change status', error);
        }
    };

    return (
        <section className='bg-white max-w-screen-2xl mt-32'>
            <div className='layout'>
                {isLoading && <LoadingSpinner />}
                {admin && (
                    <ButtonAddProduct setOpenModal={setOpenModalProduct} />
                )}
                <button
                    onClick={fetchingData}
                    className='px-4 py-1 bg-gray-300 rounded-md shadow-md mt-2'
                >
                    Refresh Data
                </button>
                {openModalProduct && (
                    <AddProduct setOpenModal={setOpenModalProduct} />
                )}
            </div>
            <div className='layout bg-white flex flex-col gap-4 py-10'>
                <div className='w-full lg:w-10/12 overflow-auto'>
                    <h1 className='text-3xl'>Products</h1>
                    <TableProducts
                        pizzaList={pizzaList}
                        deleteProduct={deleteProductHandler}
                        setOpenModalConfirm={setOpenModalConfirm}
                        openModalConfirm={openModalConfirm}
                    />
                </div>

                <div className='w-full mt-10 overflow-auto'>
                    <h1 className='text-3xl'>Orders</h1>
                    <TableOrders
                        orderList={orderList}
                        handleStatus={handleStatus}
                    />
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
