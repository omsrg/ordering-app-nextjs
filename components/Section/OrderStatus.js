import Image from 'next/image';
import clsx from 'clsx';

const OrderStatus = ({ status }) => {
    const statusClass = (index) => {
        if (index - status < 1) return 'done';
        if (index - status === 1) return 'in-progress';
        if (index - status > 1) return 'undone';
    };

    return (
        <>
            {/* preparing */}
            <div className={statusClass(1)}>
                <Image src='/images/bake.png' width={30} height={30} alt='' />
                <span className='text-sm md:text-base'>Preparing</span>
                <div className='checked-icon'>
                    <Image
                        className=''
                        src='/images/checked.png'
                        width={20}
                        height={20}
                        alt=''
                    />
                </div>
            </div>

            {/* on the way */}
            <div className={statusClass(2)}>
                <Image src='/images/bike.png' width={30} height={30} alt='' />
                <span className='text-sm md:text-base'>On the way</span>
                <div className='checked-icon'>
                    <Image
                        className=''
                        src='/images/checked.png'
                        width={20}
                        height={20}
                        alt=''
                    />
                </div>
            </div>

            {/* delivered */}
            <div
                className={clsx(status < 2 && 'undone', status === 2 && 'done')}
            >
                <Image
                    src='/images/delivered.png'
                    width={30}
                    height={30}
                    alt=''
                />
                <span className='text-sm md:text-base'>Delivered</span>
                <div className='checked-icon'>
                    <Image
                        className=''
                        src='/images/checked.png'
                        width={20}
                        height={20}
                        alt=''
                    />
                </div>
            </div>
        </>
    );
};

export default OrderStatus;
