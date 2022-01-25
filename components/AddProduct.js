import axios from 'axios';
import { useState } from 'react';

const AddProduct = ({ setOpenModal }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extra, setExtra] = useState(null);
    const [extraOptions, setExtraOptions] = useState([]);

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
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'ordering-app');
        try {
            const uploadRes = await axios.post(
                'https://api.cloudinary.com/v1_1/gryffin/image/upload',
                data
            );

            // console.log('url:', uploadRes.data.url);
            // console.log(typeof uploadRes.data.secure_url);

            const url = uploadRes.data.secure_url;
            const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                image: url,
            };

            await axios.post(
                `${process.env.SITE_URL}/api/products`,
                newProduct
            );
            // console.log(res);
            setOpenModal(false);
        } catch (error) {
            // console.log('failed upload data', error);
        }
    };

    return (
        <div className=''>
            <div className=''>
                <span onClick={() => setOpenModal(false)}>X</span>
                <h2>Add a new Pizza</h2>
                <div className='item'>
                    <label htmlFor='image'>Choose an Image</label>
                    <input
                        type='file'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <div className='item'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='item'>
                    <label htmlFor='desc'>Description</label>
                    <input
                        type='text'
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>

                <div className='item'>
                    <label htmlFor='prices'>Prices</label>
                    <input
                        type='number'
                        placeholder='small'
                        onChange={(e) => changePrice(e, 0)}
                        className=''
                    />
                    <input
                        type='number'
                        placeholder='medium'
                        onChange={(e) => changePrice(e, 1)}
                        className=''
                    />
                    <input
                        type='number'
                        placeholder='large'
                        onChange={(e) => changePrice(e, 2)}
                        className=''
                    />
                </div>

                <div className='item'>
                    <label htmlFor='desc'>Extra</label>
                    <div className='ex'>
                        <input
                            type='text'
                            placeholder='item'
                            name='text'
                            onChange={handleExtraInput}
                            className=''
                        />
                        <input
                            type='number'
                            placeholder='price'
                            name='price'
                            onChange={handleExtraInput}
                            className=''
                        />
                        <button onClick={handleExtra}>Add</button>
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
                <button onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
};

export default AddProduct;
