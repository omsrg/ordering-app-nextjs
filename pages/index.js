import Seo from '@/components/Seo';
import Hero from '@/components/Hero';
import PizzaList from '@/components/PizzaList';

import axios from 'axios';

export default function Home({ pizzaList }) {
    return (
        <>
            <Seo templateTitle='Home' />

            <main>
                <section className=''>
                    <Hero />
                    <PizzaList pizzaList={pizzaList} />
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

    const response = await axios.get(`${process.env.SITE_URL}/api/products`);

    return {
        props: {
            pizzaList: response.data,
            admin,
        },
    };
};
