
import { toast } from 'react-toastify';

const options = {
    position: "bottom-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
export const successMsg = (msg) =>
{
    toast.success(msg, options)
}
export const errorMsg = (msg) =>
{
    toast.error(msg, options)
}
export const infoMsg = (msg) =>
{
    toast.info(msg, options)
}
export const warningMsg = (msg) =>
{
    toast.warning(msg, options)
}
