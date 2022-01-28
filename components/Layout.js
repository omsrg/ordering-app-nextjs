import MainNavigation from '@/components/MainNavigation/MainNavigation';
import Footer from './Footer';

function Layout(props) {
    return (
        <>
            <MainNavigation />
            <main className='bg-dark'>{props.children}</main>
            <Footer />
        </>
    );
}

export default Layout;
