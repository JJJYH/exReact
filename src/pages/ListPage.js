import BlogList from "../components/BlogList";

const ListPage = () =>{

    return(
        <div>
            <div className="d-flex justify-content-between">
                <h1>Blogs</h1>
            </div>
            <BlogList isAdmin={false}/>
        </div>
    );
}

export default ListPage;