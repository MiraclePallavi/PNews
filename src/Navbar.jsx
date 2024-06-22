import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
//import logo from './assets/logo.png';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between py-4 bg-violet-300 overflow-hidden">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center">
            
            <span className="text-2xl text-pink-900 font-mono ml-2">TYT</span>
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 hover:text-pink-600 focus:outline-none"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <div className={`flex flex-col md:flex-row ${menuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 mt-4 md:mt-0 w-full md:w-auto">
            <NavLink to="/" className="rounded-md bg-violet-500 px-3 py-2 text-xl font-medium text-gray-800 hover:bg-violet-900 active:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-200 hover:text-white">
              Home
            </NavLink>
            <NavLink to="/health" className="rounded-md px-3 py-2 text-xl font-medium text-gray-800 hover:bg-violet-900 active:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-200 hover:text-white">
              Health
            </NavLink>
            <NavLink to="/technology" className="rounded-md px-3 py-2 text-xl font-medium text-gray-800 hover:bg-violet-900 active:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-200 hover:text-white">
              Technology
            </NavLink>
            <NavLink to="/sports" className="rounded-md px-3 py-2 text-xl font-medium text-gray-800 hover:bg-violet-900 active:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-200 hover:text-white">
              Sports
            </NavLink>
            <NavLink to="/weather" className="rounded-md px-3 py-2 text-xl font-medium text-gray-800 hover:bg-violet-900 active:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-200 hover:text-white">
              Weather
            </NavLink>
            <NavLink to="/politics" className="rounded-md px-3 py-2 text-xl font-medium text-gray-800 hover:bg-violet-900 active:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-200 hover:text-white">
              Politics
            </NavLink>
          </div>
        </div>
        <div className="flex justify-end items-center space-x-4 mt-4 md:mt-0">
          <NavLink to="/bookmark" className="hover:text-white">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black hover:bg-pink-800 hover:text-white cursor-pointer">
              <BookmarksIcon />
            </span>
          </NavLink>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="px-3 py-2 text-sm border border-gray-300 rounded-md"
            />
            <button type="submit" className="px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md flex items-center">
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;
