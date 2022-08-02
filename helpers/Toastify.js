
import { toast } from 'react-toastify';

export const successMsg = (msg) =>
{
    toast.success(msg)
}
export const errorMsg = (msg) =>
{
    toast.error(msg)
}
export const infoMsg = (msg) =>
{
    toast.info(msg)
}
export const warningMsg = (msg) =>
{
    toast.warning(msg)
}
