import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const fullname = localStorage.getItem('name');
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close the sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest('.menu-button')) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close the sidebar when navigating to a new page
  useEffect(() => {
    closeSidebar();
  }, [location]);

  return (
    <>
      <button
        className="lg:hidden p-2 text-gray-50 bg-gray-800 absolute left-4 top-2 menu-button"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </button>
      <div
        ref={sidebarRef}
        className={`h-screen lg:max-h-full w-60 bg-gray-800 text-white fixed top-0 left-0 z-40 lg:relative lg:translate-x-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:transform-none transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 text-4xl my-5 font-bold">
          SG Store
        </div>
        <nav className="mt-4">
          <ul className="text-xl">
            {token ? (
              <>
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/" onClick={closeSidebar}>
                    <HomeIcon className="mx-3" /> Home
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/products" onClick={closeSidebar}>
                    <InfoOutlinedIcon className="mx-3" /> Products
                  </Link>
                </li>
                {role === 'admin' && (
                  <>
                    <li className="px-4 py-2 hover:bg-gray-700">
                      <Link to="/services" onClick={closeSidebar}>
                        <ManageAccountsOutlinedIcon className="mx-3" /> Employee
                      </Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700">
                      <Link to="/admin" onClick={closeSidebar}>
                        <AdminPanelSettingsOutlinedIcon className="mx-3" /> Admin
                      </Link>
                    </li>
                  </>
                )}
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/bill" onClick={closeSidebar}>
                    <AddCardOutlinedIcon className="mx-3" /> Bill
                  </Link>
                </li>
              </>
            ) : (
              <ul className="text-xl">
                <li className="px-4 py-2 hover:bg-gray-700">
                  <Link to="/" onClick={closeSidebar}>
                    <HomeIcon className="mx-3" /> Home
                  </Link>
                </li>
              </ul>
            )}
          </ul>
        </nav>
        {token ? (
          <div className="mt-4 mx-7 absolute bottom-5">
            <div className="mx-2 text-2xl my-8 font-semibold">{fullname}</div>
            <button className="px-4 py-2 text-xl text-white bg-red-800 rounded-lg" onClick={logoutHandler}>
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-4 mx-7 absolute bottom-5">
            <Link to="/login">
              <button className="px-4 py-2 text-xl text-white bg-blue-800 rounded-lg">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
