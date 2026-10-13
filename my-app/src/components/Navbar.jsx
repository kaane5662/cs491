import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-sky-100 shadow-md px-8 py-4">
      <ul className="flex gap-8 list-none m-0 p-0 items-center">
        <li>
          <Link
            to="/"
            className="text-sky-700 hover:text-sky-900 font-semibold px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-sky-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-sky-700 hover:text-sky-900 font-semibold px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-sky-200"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/users/1"
            className="text-sky-700 hover:text-sky-900 font-semibold px-3 py-2 transition-colors duration-200 rounded-lg hover:bg-sky-200"
          >
            User 1
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;