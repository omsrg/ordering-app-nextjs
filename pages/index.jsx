import { useState } from 'react';
import Seo from '@/components/Seo';
import Hero from '@/components/Hero';
import PizzaList from '@/components/PizzaList';

import axios from 'axios';
// import OrderDetail from '@/components/OrderDetail';

export default function Home({ pizzaList, admin }) {
    const [close, setClose] = useState(true);

    return (
        <>
            <Seo templateTitle='Home' />

            <main>
                <section className=''>
                    <Hero />
                    <PizzaList pizzaList={pizzaList} />

                    {/* <OrderDetail /> */}
                </section>
            </main>
        </>
    );
}

export const getServerSideProps = async (context) => {
    const myCookie = context.req?.cookies || '';
    let admin = false;

    if (myCookie.token === process.env.TOKEN) {
        admin = true;
    }

    const response = await axios.get('http://localhost:3000/api/products');

    return {
        props: {
            pizzaList: response.data,
            admin,
        },
    };
};
