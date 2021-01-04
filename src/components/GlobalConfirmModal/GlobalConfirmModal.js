import React, { useContext } from 'react';
import { ConfirmModal } from 'remember-ui';

import { ConfirmModalContext } from 'context/ConfirmModalContext';

const GlobalConfirmModal = () => {
  const {
    state: { isOpenConfirmModal, modalContents },
    actions: { closeConfirmModal },
  } = useContext(ConfirmModalContext);

  const { callbackOk, type, icon, title, message } = modalContents;

  const onOk = () => {
    callbackOk();
    closeConfirmModal();
  };

  return (
    <ConfirmModal
      isOpen={isOpenConfirmModal}
      onClose={closeConfirmModal}
      onOk={onOk}
      title={title}
      message={message}
      icon={icon}
      type={type}
      closeText="닫기"
      okText="확인"
    />
  );
};

export default GlobalConfirmModal;
