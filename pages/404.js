import UnstyledLink from '@/components/Links/UnstyledLink';

const NotFoundPage = () => {
    return (
        <section className='bg-white max-w-screen-2xl'>
            <div className='layout h-128 flex flex-col items-center justify-center text-white'>
                <h1>Page Not Found</h1>
                <UnstyledLink
                    href='/'
                    className='mt-4 text-primary-400 hover:underline'
                >
                    Back to Home
                </UnstyledLink>
            </div>
        </section>
    );
};

export default NotFoundPage;
