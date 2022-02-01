import Layout from '@/components/Layout';
import '@/styles/globals.css';
import nProgress from 'nprogress';
import { CartContextProvider } from '@/context/CartContext';
import Router from 'next/router';
import '../styles/nprogress.css';
nProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
    Router.events.on('routeChangeStart', nProgress.start);
    Router.events.on('routeChangeError', nProgress.done);
    Router.events.on('routeChangeComplete', nProgress.done);
    return (
        <CartContextProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </CartContextProvider>
    );
}

export default MyApp;
