import propTypes from 'prop-types';

const Toast = ({toasts, deleteToast}) =>{
    return (
    <div className="position-fixed bottom-0 end-0 p-2 align-items-center">
        {toasts.map(toasts => {
           return(
                <div key={toasts.id} className={`alert alert-${toasts.type||'success'} m-0 mt-2 py-2 `} onClick={()=>{deleteToast(toasts.id)}}>
                    {toasts.text}
                </div>
           ); 
        })}
    </div>
    );
};

Toast.propTypes ={
    toasts: propTypes.arrayOf(propTypes.shape({
    text: propTypes.string,
    type: propTypes.string
    })).isRequired,
    deleteToast: propTypes.func.isRequired
};

Toast.defaultProps = {
    toasts: []
};

export default Toast;