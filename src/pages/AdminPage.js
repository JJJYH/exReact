import {Link} from 'react-router-dom';
import BlogList from "../components/BlogList";

const AdminPage = () =>{
    
    return(
        <div>
            <div className="d-flex justify-content-between">
                <h1>Admin</h1>
                <Link to='/blogs/create' className="btn btn-success mb-3">
                    Create New
                </Link>
            </div>
            <BlogList isAdmin={true}/>
        </div>
    );
}

export default AdminPage;