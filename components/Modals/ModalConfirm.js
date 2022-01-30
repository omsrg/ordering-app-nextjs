const ModalConfirm = ({ onCancel, onConfirm }) => {
    function cancelHandler() {
        onCancel();
    }

    function confirmHandler() {
        onConfirm();
    }

    return (
        <div className='shadow-md rounded-md p-4 bg-primary-500 text-center w-[20rem] z-30 top-[30vh] left-[calc(50%_-_10rem)] fixed'>
            <p className='mb-2 text-white'>Are you sure?</p>
            <button className='btn btn--alt' onClick={cancelHandler}>
                Cancel
            </button>
            <button className='btn' onClick={confirmHandler}>
                Confirm
            </button>
        </div>
    );
};

export default ModalConfirm;
