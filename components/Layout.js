import Navbar from './Navbar';
import Footer from './Footer';

function Layout(props) {
    return (
        <>
            <Navbar />
            <main className='bg-dark'>{props.children}</main>
            <Footer />
        </>
    );
}

export default Layout;
