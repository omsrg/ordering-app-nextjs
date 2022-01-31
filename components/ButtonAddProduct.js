import { FaPlus } from 'react-icons/fa';

const AddButton = ({ setOpenModal }) => {
    return (
        <button
            onClick={() => setOpenModal(true)}
            className='text-lg py-2 px-8 mr-6 bg-primary-500 rounded-md text-white w-max hover:bg-primary-100'
        >
            <div className='flex items-center space-x-1 font-bold'>
                <FaPlus />
                <span>Add new Product</span>
            </div>
        </button>
    );
};

export default AddButton;
