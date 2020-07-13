import React from 'react';

const useModal = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const handleShow = async () => setModalShow(true);
    const handleClose = async () => setModalShow(false);

    return {
        modalShow, setModalShow,
        handleShow, handleClose
    }
}  

export default useModal