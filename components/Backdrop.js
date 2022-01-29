const Backdrop = ({ onCancel }) => {
    return (
        <div
            className='fixed top-0 left-0 bg-black/75 w-full h-full z-[20]'
            onClick={onCancel}
        />
    );
};

export default Backdrop;
