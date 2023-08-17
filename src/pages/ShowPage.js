import axios from "axios";
import { useEffect, useState } from "react";
import {useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import {Link} from 'react-router-dom';


const ShowPage = () =>{
    const {id} = useParams();

    const [post , setPost] = useState({});
    const [loading, setLoading] = useState(true);
    

    const getPost = (id) =>{
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
            setPost(res.data);
            setLoading(false);
        });
    }

    useEffect(()=>{
        getPost(id);
    },[id]);

    const printData = (timestamp) =>{
        return new Date(timestamp).toLocaleString();
    }


    if(loading){
        return <LoadingSpinner/>;
    }

    return (
        <div>
            <div className="d-flex">
                <h1 className="flex-grow-1">{post.title}</h1>
                <Link
                    className="btn btn-primary"
                    to={`/blogs/${id}/edit`}
                >
                Edit
                </Link>
            </div>
            <small className="text-muted">{printData(post.createAt)}</small>
            <p>{post.content}</p>
        </div>
    );
};

export default ShowPage;