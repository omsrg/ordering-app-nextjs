import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList }) => {
    return (
        <section className='bg-dark max-w-screen-2xl py-8' id='menu'>
            <div className='layout bg-dark py-4 flex flex-col items-center'>
                <h1 className='text-2xl md:text-3xl text-white my-8'>
                    Choose your favorite
                </h1>

                <div className='grid gap-4 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                    {pizzaList.map((pizza) => (
                        <PizzaCard key={pizza._id} pizza={pizza} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PizzaList;
