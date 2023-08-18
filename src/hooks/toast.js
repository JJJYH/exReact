import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import { addToast as add, removeToast as remove } from '../store/toastSlice';
import { useDispatch } from 'react-redux';

const useToast = () =>{

    const toasts = useRef([]);
    const [toastRerender, setToastRerender] = useState(false);
    const dispatch = useDispatch();

    const deleteToast = (id) => {
        dispatch(remove(id));
        // const filteredToasts = toasts.current.filter(toast => {
        //     return toast.id !== id;
        // });
        // toasts.current = filteredToasts;
        // setToastRerender(prev=>!prev);
    };

    const addToast = (toast) =>{
        const id = uuidv4();
        const toastWidthId = {
            ...toast,
            id,
        }

        dispatch(add(toastWidthId));

        //toasts.current = [...toasts.current, toastWidthId];
        //setToastRerender(prev=>!prev);

        setTimeout(() => {
            deleteToast(id);
        }, 3000);
    };

    return{
        //toasts.current,
        addToast,
        deleteToast
    };

}

export default useToast;