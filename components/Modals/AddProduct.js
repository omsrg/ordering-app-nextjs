import { useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner';

const AddProduct = ({ setOpenModal }) => {
    const [chosenImage, setChosenImage] = useState(null);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extra, setExtra] = useState(null);
    const [extraOptions, setExtraOptions] = useState([]);
    const targetFile = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = (e) => {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        setFile(uploadedImage);
        setChosenImage(URL.createObjectURL(uploadedImage));
    };

    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    };

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = () => {
        setExtraOptions((prev) => [...prev, extra]);
    };

    const handleCreate = async () => {
        setIsLoading(true);
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'ordering-app');
        try {
            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/gryffin/image/upload',
                data
            );

            const url = uploadRes.data.secure_url;
            const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                image: url,
            };

            await axios.post(`/api/products`, newProduct);
            setOpenModal(false);
            setIsLoading(false);
        } catch (error) {
            // console.log('failed upload data', error);
        }
    };

    return (
        <div className='flex justify-center'>
            {isLoading && <LoadingSpinner />}
            <form
                className='relative bg-gray-200 p-4 shadow-md rounded-md flex-col justify-center'
                onSubmit={(e) => e.preventDefault()}
            >
                <div className='absolute top-4 right-4 cursor-pointer'>
                    <FaTimes
                        className='w-8 h-8'
                        onClick={() => setOpenModal(false)}
                    />
                </div>
                <h2 className='text-2xl text-center'>Add a new Pizza</h2>
                <div className='flex flex-col w-1/4 items-center'>
                    <div className='mb-2 w-52 flex items-center justify-center text-sm'>
                        {file !== null && (
                            <Image
                                src={chosenImage}
                                objectFit='cover'
                                width={200}
                                height={200}
                                alt=''
                            />
                        )}
                    </div>
                    {file !== null ? (
                        <span className='mb-1'>{file.name}</span>
                    ) : (
                        <span>No file chosen</span>
                    )}
                    <input
                        type='file'
                        className='hidden'
                        ref={targetFile}
                        onChange={(e) => handleUpload(e)}
                    />
                    <button
                        className='px-4 py-1 w-max text-white bg-primary-500 rounded-md shadow-md'
                        onClick={() => targetFile.current.click()}
                    >
                        Choose an Image
                    </button>
                </div>

                <div className='mt-3'>
                    <label htmlFor='title'>Title</label>
                    <div className='mt-1'>
                        <input
                            type='text'
                            className='border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>

                <div className='mt-3'>
                    <label htmlFor='desc'>Description</label>
                    <div className='mt-1'>
                        <input
                            type='text'
                            className='border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>
                </div>

                <div className='mt-3'>
                    <label htmlFor='prices'>Prices</label>
                    <div className='mt-1 space-x-1'>
                        <input
                            type='number'
                            placeholder='small'
                            className='border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                            onChange={(e) => changePrice(e, 0)}
                        />
                        <input
                            type='number'
                            placeholder='medium'
                            className='border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                            onChange={(e) => changePrice(e, 1)}
                        />
                        <input
                            type='number'
                            placeholder='large'
                            className='border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                            onChange={(e) => changePrice(e, 2)}
                        />
                    </div>
                </div>

                <div className='mt-3'>
                    <label htmlFor='desc'>Extra</label>
                    <div className=''>
                        <input
                            type='text'
                            placeholder='item'
                            name='text'
                            onChange={handleExtraInput}
                            className='border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400 mr-1'
                        />
                        <input
                            type='number'
                            placeholder='price'
                            name='price'
                            onChange={handleExtraInput}
                            className='border-gray-300 rounded-lg shadow-sm focus:border-primary-400 focus:ring-primary-400'
                        />

                        <button
                            className='ml-8 px-6 py-2 bg-primary-500 text-white rounded-md shadow-sm hover:bg-opacity-75'
                            onClick={handleExtra}
                        >
                            add extra
                        </button>
                    </div>

                    <div>
                        {extraOptions.map((option) => (
                            <span key={option.text}>
                                {option.text}
                                {option.price}
                            </span>
                        ))}
                    </div>
                </div>
                <div className='mt-10'>
                    <button
                        className='button rounded-lg w-full'
                        onClick={handleCreate}
                    >
                        ADD NEW PRODUCT
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
