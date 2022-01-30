import ModalConfirm from '@/components/Modals/ModalConfirm';
import Backdrop from '@/components/Modals/Backdrop';
import Image from 'next/image';

import { FaEdit, FaTrash } from 'react-icons/fa';

const TableProducts = ({
    pizzaList,
    deleteProduct,
    setOpenModalConfirm,
    openModalConfirm,
}) => {
    const openModalConfirmHandler = (id) => {
        setOpenModalConfirm({ show: true, id });
    };

    const closeModalConfirmHandler = () => {
        setOpenModalConfirm({ show: false, id: null });
    };

    return (
        <>
            {openModalConfirm.show && (
                <ModalConfirm
                    onCancel={closeModalConfirmHandler}
                    onConfirm={deleteProduct}
                />
            )}
            {openModalConfirm.show && (
                <Backdrop onCancel={closeModalConfirmHandler} />
            )}

            <table className='w-full table-auto mt-4'>
                <thead className='bg-gray-200'>
                    <tr className='text-dark text-left'>
                        <th className='p-1 w-10 tracking-wider'>Image</th>
                        <th className='p-1 w-32 tracking-wider'>Id</th>
                        <th className='p-1 w-20 tracking-wider'>
                            Product name
                        </th>
                        <th className='p-1 w-10 tracking-wider'>Price</th>
                        <th className='p-1 w-20 tracking-wider'>Action</th>
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
                                <td className='p-1'>${product.prices[0]}</td>
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
                                            openModalConfirmHandler(product._id)
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
        </>
    );
};

export default TableProducts;
