import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '@/redux/cartSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import OrderDetail from '@/components/OrderDetail';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from '@paypal/react-paypal-js';

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    // This values are the props in the UI
    const amount = cart.total;
    const currency = 'USD';
    const style = { layout: 'vertical' };

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const router = useRouter();

    const createOrder = async (data) => {
        try {
            const res = await axios.post(
                `${process.env.SITE_URL}/api/orders`,
                data
            );
            res.status === 201 && router.push('/order/' + res.data._id);
            dispatch(reset());
        } catch (error) {
            // console.log(error);
        }
    };

    const cancelHandler = () => {
        setCash(false);
    };

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: 'resetOptions',
                value: {
                    ...options,
                    currency: currency,
                },
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className='spinner' />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            // Your code here after capture the order
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customer: shipping.name.full_name,
                                address: shipping.address.address_line_1,
                                total: cart.total,
                                method: 1,
                            });
                        });
                    }}
                />
            </>
        );
    };

    return (
        <section className='bg-white'>
            <div className='layout h-128 flex bg-white py-10 gap-4'>
                <div className='w-9/12'>
                    <table className='w-full '>
                        {/* border-separate [border-spacing:1rem] */}
                        <thead className='bg-gray-200'>
                            <tr className='text-dark text-left'>
                                <th className='p-3 w-20 tracking-wider'>
                                    Product
                                </th>
                                <th className='p-3 w-32 tracking-wider'>
                                    Name
                                </th>
                                <th className='p-3 w-40 tracking-wider'>
                                    {' '}
                                    Extras
                                </th>
                                <th className='p-3 w-20 tracking-wider'>
                                    Price
                                </th>
                                <th className='p-3 w-20 tracking-wider'>
                                    Quantity
                                </th>
                                <th className='p-3 w-20 tracking-wider'>
                                    Total
                                </th>
                            </tr>
                        </thead>

                        <tbody className='divide-y'>
                            {cart.products.map((product) => (
                                <tr
                                    key={product.product._id}
                                    className='text-dark odd:bg-gray-100 even:bg-gray-200'
                                >
                                    <td className='p3'>
                                        <div className='w-[100px] h-[100px] relative flex justify-center'>
                                            <Image
                                                src={product.product.image}
                                                layout='fill'
                                                objectFit='cover'
                                                alt=''
                                            />
                                        </div>
                                    </td>
                                    <td className='p-3'>
                                        <span className='font-semibold'>
                                            {product.product.title}
                                        </span>
                                    </td>
                                    <td className='p-3'>
                                        {product.extras.map((extra, idx) => (
                                            <span key={extra._id} className=''>
                                                {idx > 0 && ', '}
                                                {extra.text}
                                            </span>
                                        ))}
                                    </td>
                                    <td className='p-3'>
                                        <span className=''>
                                            ${product.price}
                                        </span>
                                    </td>
                                    <td className='p-3'>
                                        <span className=''>
                                            {product.quantity}
                                        </span>
                                    </td>
                                    <td className='p-3'>
                                        <span className=''>
                                            ${product.price * product.quantity}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='w-3/12 '>
                    <div className='max-w-[300px] bg-dark p-4 flex flex-col justify-between text-white'>
                        <h2 className=''>CART TOTAL</h2>
                        <div className=''>
                            <b className='mr-2'>Subtotal:</b>${cart.total}
                        </div>
                        <div className=''>
                            <b className='mr-2'>Discount:</b>$0.00
                        </div>
                        <div className=''>
                            <b className='mr-2'>Total:</b>${cart.total}
                        </div>

                        {open ? (
                            <div className='mt-2 flex flex-col'>
                                <button
                                    onClick={() => setCash(true)}
                                    className='text-l py-1 px-8 my-2 text-teal-500 font-bold rounded-md cursor-pointer bg-white'
                                >
                                    Cash On Delivery
                                </button>
                                <PayPalScriptProvider
                                    options={{
                                        'client-id':
                                            'AYtpebju8878tFhMQWLyGg7dEaHl7UCnDGboFK0wWFIXHSSiVHtNsSRsJ1SGO0XShlv6X6KRopVcrUzk',
                                        components: 'buttons',
                                        currency: 'USD',
                                        'disable-funding': 'card',
                                    }}
                                >
                                    <ButtonWrapper
                                        currency={currency}
                                        showSpinner={false}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        ) : (
                            <button
                                onClick={() => setOpen(true)}
                                className='py-2 px-8 mt-2 text-[#d1411e] font-bold cursor-pointer bg-white'
                            >
                                CHECKOUT NOW!
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {cash && (
                <OrderDetail
                    total={cart.total}
                    createOrder={createOrder}
                    onCancel={cancelHandler}
                />
            )}
        </section>
    );
};

export default Cart;
