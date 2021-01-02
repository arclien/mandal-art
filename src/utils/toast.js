import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const defaultToastOption = {
  position: 'top-center',
  autoClose: 3000,
  closeOnClick: true,
  pauseOnHover: true,
};

export const customToast = (content) => {
  toast(content, {
    ...defaultToastOption,
  });
};

export const errorToast = (content) => {
  toast.error(content, {
    ...defaultToastOption,
  });
};
