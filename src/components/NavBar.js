import {Link, NavLink} from 'react-router-dom';

const NavBar = () =>{
    return (
        <nav className="navbar navbar-dark bg-dark navbar-light bg-light mb-3">
            <div className="container">
                <Link className="navbar-brand" to="/">Home</Link>
                <ul className="navbar-nav" style={{flexDirection: 'row'}}>
                    <li className="nav-item active me-4">
                        <NavLink className="nav-link" to="/admin"
                            activeClassName="active"
                        >
                            Admin
                        </NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/blogs"
                            activeClassName="active"
                        >
                            Blogs
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;