import PizzaCard from './PizzaCard';

const PizzaList = ({ pizzaList }) => {
    return (
        <section>
            <div className='layout py-4 flex flex-col items-center'>
                <h1 className='text-white my-8'>Choose your favorite</h1>

                <div className='w-full flex items-center justify-center flex-wrap'>
                    {pizzaList.map((pizza) => (
                        <PizzaCard key={pizza._id} pizza={pizza} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PizzaList;
