import React, { useState, createContext } from 'react';

const Context = createContext();

const { Provider, Consumer: ConfirmModalConsumer } = Context;

const DEFAULT_MODAL_CONTENTS = {
  callbackOk: () => {},
  callbackNo: () => {},
  type: '',
  icon: '',
  title: '',
  message: '',
};
const ConfirmModalProvider = ({ children }) => {
  const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);
  const [modalContents, setModalContents] = useState({
    ...DEFAULT_MODAL_CONTENTS,
  });

  const openDeleteConfirmModal = (
    callbackOk = () => {},
    title,
    message = '',
    type = 'delete',
    icon = 'warning',
    callbackNo = () => {}
  ) => {
    setModalContents({ callbackOk, callbackNo, type, icon, title, message });
    setOpenConfirmModal(true);
  };

  const openOkConfirmModal = (
    callbackOk = () => {},
    title,
    message = '',
    type = 'ok',
    icon = 'success',
    callbackNo = () => {}
  ) => {
    setModalContents({ callbackOk, callbackNo, type, icon, title, message });
    setOpenConfirmModal(true);
  };

  const closeConfirmModal = () => {
    setModalContents({ ...DEFAULT_MODAL_CONTENTS });
    setOpenConfirmModal(false);
  };

  return (
    <Provider
      value={{
        state: { isOpenConfirmModal, modalContents },
        actions: {
          openDeleteConfirmModal,
          openOkConfirmModal,
          closeConfirmModal,
        },
      }}
    >
      {children}
    </Provider>
  );
};

const ConfirmModalContext = Context;

export { ConfirmModalProvider, ConfirmModalConsumer, ConfirmModalContext };
