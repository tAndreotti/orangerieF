import './Navbar.css';

// components
import { NavLink, Link } from 'react-router-dom';

// hooks
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// redux
import { logout, reset } from '../slices/authSlice';

const Navbar = () => {
    const [ auth ] = useAuth();
    const { user } = useSelector((state) => state.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    };

    window.addEventListener("scroll", function() {
        var header = document.querySelector("#nav");
        if (window.pageYOffset > 50) {
          header.classList.add("header-active");
        } else {
          header.classList.remove("header-active");
        }
    });

  return (
    <nav id='nav'>
        <Link id='logo' to="/"><strong>ORANGERIE</strong></Link>
        <ul id='nav-links'>
            {auth ? (
                <>
                    <li>
                        <NavLink to="/posts">
                            Posts
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink to={`/users/${user._id}`}>
                                Meus Posts
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to="/profile">
                            Perfil
                        </NavLink>
                    </li>
                    <li>
                        <span onClick={handleLogout}>Sair</span>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">
                            Registro
                        </NavLink>
                    </li>
                </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar