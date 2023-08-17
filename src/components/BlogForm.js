import axios from 'axios';
import { bool } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import Toast from './Toast';

const BlogForm = ({editing}) => {
    const {id} = useParams();
    //useState
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [publish, setPublish] = useState(false);
    const [originalTitle, setOriginalTitle] = useState('');
    const [originalBody, setOriginalBody] = useState('');
    const [originalPublish, setOriginalPublish] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);
    //const [toasts, setToasts] = useState([]);
    const toasts = useRef([]);
    const [toastRerender, setToastRerender] = useState(false);

    

    //useHistory
    const history = useHistory();

    //handler
    const titleHandler = (event) => {
        setTitle(event.target.value);
    }
    const bodyHandler = (event) => {
        setBody(event.target.value);
    }

    const isError = () => {
        if(title===''){
            setTitleError(true);
        }else{
            setTitleError(false);
        }
        if(body===''){
            setBodyError(true);
        }else{
            setBodyError(false);
        }
    }

    const submitHandler = (event) => {
        if(title===''||body===''){
            isError();
        }else{
                axios.post('http://localhost:3001/posts', {
                title: title,
                content: body,
                publish: publish
            }).then(()=>{
                addToast({
                    text: 'Successfully created',
                    type: 'success'
                });
                //history.push('/admin');
            });
        }
    }

    const editHandler = (event) => {
        if(title===''|| body===''){
            isError();
        }else{
            axios.put(`http://localhost:3001/posts/${id}`,{
                title: title,
                content: body,
                publish: publish,
                createAt: Date.now(),
                id:{id}
            }).then(()=>{
                addToast({
                    text: 'Successfully created',
                    type: 'success'
                });
                //history.push('/admin');
            })
        }
    };

    const getEdit = (id) =>{
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
            setTitle(res.data.title);
            setBody(res.data.content);
            setPublish(res.data.publish);
            setOriginalTitle(res.data.title);
            setOriginalBody(res.data.content);
            setOriginalPublish(res.data.publish);
        })
    }
    const isEditing = () =>{
        return title !== originalTitle 
            || body !== originalBody 
            || publish !== originalPublish;
    }

    const goBack = () => {

        

        if(editing){
            history.push(`/blogs/${id}`);
        }else{
            history.push('/admin');
        }
    }

    const onChangePublish = (e) =>{
        setPublish(e.target.checked);
    }

    const deleteToast = (id) => {
        const filteredToasts = toasts.current.filter(toast => {
            return toast.id !== id;
        });
        toasts.current = filteredToasts;
        setToastRerender(prev=>!prev);
        //setToasts(filteredToast);
    };

    const addToast = (toast) =>{
        const id = uuidv4();
        const toastWidthId = {
            ...toast,
            id,
        }

        //setToasts(prev=> [...prev, toastWidthId]);
        toasts.current = [...toasts.current, toastWidthId];
        setToastRerender(prev=>!prev);

        setTimeout(() => {
            deleteToast(id);
        }, 3000);
    };


    useEffect(()=>{
        if(editing){
            getEdit(id);
        }
    },[id, editing]);

    
    

    return (
        <div>
            <Toast toasts={toasts.current} deleteToast={deleteToast}/>
            <h1>{editing?'Edit' : 'Create'} a blog post</h1>
            <div className='mb-3'>
                <label className='form-label'>Title</label>
                <input className={`form-control ${ titleError && 'border-danger'} `} value={title} onChange={titleHandler} />
                {titleError && <div className='text-danger'>
                    Title is required
                </div>}
            </div>
            <div className='mb-3'>
                <label className='form-label'>content</label>
                <textarea className={`form-control ${ bodyError && 'border-danger'} `} value={body} onChange={bodyHandler} rows='10' />
                {bodyError && <div className='text-danger'>
                    content is required
                </div>}
            </div>
            <div className='form-check mb-3'>
                <input
                    type='checkbox'
                    className='form-check-input'
                    checked={publish}
                    onChange={onChangePublish}
                />
                <label className='form-check-label'>
                    Publish
                </label>
            </div>
            <button className='btn btn-primary' onClick={editing ? editHandler : submitHandler} disabled={editing && !isEditing()}>
                {editing? 'Edit': 'Post'}
            </button>
            <button className='btn btn-danger ms-2' onClick={goBack}>
                Cancel
            </button>
        </div>
    );
};

BlogForm.propTypes = {
    editing: bool
};

BlogForm.defaultProps = {
    editing: false
}

export default BlogForm;