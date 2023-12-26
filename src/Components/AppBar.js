import { ReactComponent as BibIcon } from '../assets/Bib.svg';
import { Link } from 'react-router-dom';

function AppBar({ transparent }) {
    const appBarClass = transparent ? 'app-bar-transparent' : '';
    const token = localStorage.getItem('token');

    return (
            <nav className={`app-bar ${appBarClass}`}>
              <div className="left-items">
              <Link to="/">
              <h1 className="title">Bibliobox</h1>
              </Link>
              <div className="nav-links">
                  {token && (
                        <button className='dashboard-button'>
                            <Link to="/dashboard">Your Plan</Link>
                        </button>
                  )}
                  <button>
                    <Link to="/ourboxes">Our Boxes</Link>
                  </button>
                  <button>
                    <Link to="/aboutus">Contact</Link>
                  </button>
                </div>
              </div>
              <div className="profile-icon">
                <Link to="/profile">
                  <BibIcon />
                </Link>
              </div>
            </nav>
    );
  }

    export default AppBar;