const Footer = () => {
    return (
        <section className='bg-[#222]'>
            <div className='layout bg-[#222] flex py-10'>
                <div className='w-full flex justify-center bg-[#222]'>
                    <div className='w-7/12 flex flex-col'>
                        <h4 className='text-[#b7903c]'>FIND OUR RESTAURANTS</h4>

                        <div className='w-7/12 flex justify-between'>
                            <div className='gap-16'>
                                <p className='mt-2 text-gray-300'>
                                    1654 R. Don Road #304.
                                    <br /> NewYork, 85022
                                    <br /> (602) 867-1010
                                </p>
                                <p className='mt-2 text-gray-300'>
                                    2356 K. Laquie Rd #235.
                                    <br /> NewYork, 85022
                                    <br /> (602) 867-1011
                                </p>
                            </div>
                            <div className='gap-16'>
                                <p className='mt-2 text-gray-300'>
                                    1614 E. Erwin St #104.
                                    <br /> NewYork, 85022
                                    <br /> (602) 867-1012
                                </p>
                                <p className='mt-2 text-gray-300'>
                                    1614 W. Caroll St #125.
                                    <br /> NewYork, 85022
                                    <br /> (602) 867-1013
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='w-5/12 px-2'>
                        <h4 className='text-[#b7903c]'>WORKING HOURS</h4>
                        <p className='mt-2 text-gray-300'>
                            MONDAY UNTIL FRIDAY
                            <br /> 9:00 – 22:00
                        </p>
                        <p className='mt-2 text-gray-300'>
                            SATURDAY - SUNDAY
                            <br /> 12:00 – 24:00
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
