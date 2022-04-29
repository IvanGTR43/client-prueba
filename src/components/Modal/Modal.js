import React from "react";
import { Modal as ModalAntd } from "antd";

const Modal = (props) => {
  const { isVisible, newData, setnewData, handleSubmit, setModalOpen, item } =
    props;

  return (
    <ModalAntd
      visible={isVisible}
      onOk={() => setModalOpen(false)}
      anCancel={() => setModalOpen(false)}
    ></ModalAntd>
  );
};

export default Modal;
