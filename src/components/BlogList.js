import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Card from "../components/Card";
import {useHistory} from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner";
import { bool } from 'prop-types';
import Pagenation from "./Pagination";
import { useLocation } from "react-router-dom";
import useToast from "../hooks/toast";

const BlogList = ({isAdmin}) =>{
    
    const his = useHistory();
    const loc = useLocation();
    const params = new URLSearchParams(loc.search);
    const pageParam = params.get('page');

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0);//총포스트
    const [numberOfPages, setNumberOfPages] = useState(0);//총페이지
    const [searchText, setSearchText] = useState('');
    const [searchText2, setSearchText2] = useState('');
    const {addToast}= useToast();

    
    //const [toasts, setToasts] = useState([]);
    // const toasts = useRef([]);
    // const [toastRerender, setToastRerender] = useState(false);
    // const [toasts, addToast, deleteToast] = useToast();
    const limit=2;

    

    const onClickPageButton = (page) =>{
        his.push(`${loc.pathname}?page=${page}`);
        getPosts(page);
    };

    //서버에 요청한 데이터를 받아옴
    const getPosts = useCallback((page = 1) => {
        let params = {
            _page: page,
            _limit: limit,
            _sort: 'id',
            _order: 'desc',
            title_like: searchText2
        }
        if(!isAdmin){
            params = {...params, publish: true}
        }
        axios.get(`http://localhost:3001/posts`,{
            params,
        }).then((res)=>{
            setCurrentPage(page);
            setNumberOfPosts(res.headers.get('X-Total-Count'));
            setPosts(res.data);
            setLoading(false);
            
        });
    }, [isAdmin, searchText2]);

    const searchTextHandler = (e) =>{
        setSearchText(e.target.value);
    };

    const onSearch = (e) =>{
        if(e.key === 'Enter'){
            setSearchText2(searchText);
            getPosts(1);
            
        }
    };

    useEffect(() =>{
        setCurrentPage(parseInt(pageParam)||1);
        getPosts(parseInt(pageParam)||1);
    },[pageParam, getPosts]);

    //무한 리렌딩을 막기위해 useEffect를 사용한다.
    useEffect (() => {
        setNumberOfPages(Math.ceil(numberOfPosts/limit));
    },[numberOfPosts]);

    // const deleteToast = (id) => {
    //     const filteredToasts = toasts.current.filter(toast => {
    //         return toast.id !== id;
    //     });
    //     toasts.current = filteredToasts;
    //     setToastRerender(prev=>!prev);
    //     //setToasts(filteredToast);
    // };

    // const addToast = (toast) =>{
    //     const id = uuidv4();
    //     const toastWidthId = {
    //         ...toast,
    //         id,
    //     }

    //     //setToasts(prev=> [...prev, toastWidthId]);
    //     toasts.current = [...toasts.current, toastWidthId];
    //     setToastRerender(prev=>!prev);

    //     setTimeout(() => {
    //         deleteToast(id);
    //     }, 3000);
    // };

    const deleteBlog = (e, id)=> {
        e.stopPropagation();
        console.log('delete');
        axios.delete(`http://localhost:3001/posts/${id}`);
        getPosts();
        addToast({
            text: "Successfully delete",
            type: "success"
        });
        // axios.delete(`http://localhost:3001/posts/${id}`).then(()=>{
        //     setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        // });
    };
    
    const renderBlogList = () => {
            if(loading){
                return(
                    <LoadingSpinner/>
                );
            }

            if(posts.length===0){
                return (
                    <div>
                        데이터 값 이 없습니다.
                    </div>
                )
            }
            
            return posts.map((post)=>{
                return(
                <Card key={post.id} title={post.title} content={post.content} limit={limit} onClick={()=>his.push(`/blogs/${post.id}`)}>
                    <div>
                        {isAdmin && <button 
                            className="btn btn-danger"
                            onClick={(e) => deleteBlog(e, post.id)}
                        >
                            Delete
                        </button>}
                    </div>
                </Card>
            );
        });
    };


    return(
        <div>
            {/* <Toast toasts={toasts} deleteToast={deleteToast}/> */}
            <input
                type="text"
                placeholder="Search..."
                className="form-control"
                value={searchText}
                onChange={searchTextHandler}
                onKeyUp={onSearch}
            />
            <hr/>
            {renderBlogList()}
            {numberOfPages>1 && <Pagenation currentPage={currentPage} numberOfPages={numberOfPages} onClick={onClickPageButton}/>}
        </div>
    );
}

BlogList.propsType = {
    isAdmin: bool
}

BlogList.defaultProps = {
    isAdmin: false
}

export default BlogList;