import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);

    const router = useRouter();

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/login`, {
                username,
                password,
            });
            router.push('/admin');
        } catch (error) {
            setError(true);
        }
    };

    return (
        <section className='max-w-screen-2xl mt-10'>
            <div className='layout py-20 h-screen flex flex-col items-center'>
                <form className='mt-4 p-6 bg-gray-100 rounded-md shadow-md flex flex-col items-center'>
                    {error && (
                        <span className='text-red-500 bg-red-200 w-full text-center py-2 rounded-md'>
                            Unauthorized!
                        </span>
                    )}
                    <h1 className='text-dark text-2xl text-center'>
                        Admin Dashboard
                    </h1>
                    <div className='mt-4'>
                        <input
                            type='text'
                            placeholder='username'
                            className='w-full focus:border-primary-400 focus:ring-primary-400 rounded-lg'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className='mt-2'>
                        <input
                            type='password'
                            placeholder='password'
                            className='w-full focus:border-primary-400 focus:ring-primary-400 rounded-lg'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='mt-6 w-full'>
                        <button
                            className='w-full py-2 bg-primary-500 rounded-md text-white cursor-pointer focus:border-none hover:bg-primary-100 transition-colors'
                            onClick={handleClick}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

// Please provide a valid email address and password.

export default LoginPage;
