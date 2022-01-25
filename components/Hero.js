const Hero = () => {
    return (
        <section className='bg-hero'>
            <div className='layout text-white h-[50vh] md:h-128 flex items-center'>
                <div className='w-[650px]'>
                    <h1 className='hero-title'>Greatest Pizza Ever</h1>
                    <p className='text-3xl mb-8'>Ready in 60 seconds</p>
                    <button className='button'>Place Order</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
