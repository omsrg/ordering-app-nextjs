// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Oval } from 'react-loader-spinner';

const Loading = () => {
    return (
        <div className='fixed w-full h-screen top-0 left-0 bg-black bg-opacity-75 flex items-center justify-center z-[300]'>
            <Oval
                ariaLabel='loading-indicator'
                height={50}
                width={50}
                strokeWidth={5}
                color='#e31837'
                secondaryColor='#ffc500'
            />
        </div>
    );
};

export default Loading;
