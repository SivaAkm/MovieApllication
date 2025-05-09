import { Link } from "react-router-dom";
import '../css/NavBar.css'


function NavBar() {
   
    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/">JetFlix Flims</Link>
                </div>
                <div className="navbar-links">
                    <Link to="/Home" className="nav-link">Home</Link>
                    <Link to="/MyFavorites" className="nav-link">Favorites</Link>
                </div>
            </nav>
            
        </>
    )
}
export default NavBar;