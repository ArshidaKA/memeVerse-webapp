import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaUser, FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="rounded-3xl shadow-sm mx-auto my-4 max-w-7xl">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-[var(--text)]">
              <span className="text-2xl font-bold text-[var(--text)]">meme</span>
              <span className="text-2xl font-bold text-[var(--primary)]">
                Verse
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-[var(--text)] hover:text-gray-600 font-medium">
            Home
          </Link>
          <Link to="/explore" className="text-[var(--text)] hover:text-gray-600 font-medium">
            Explore
          </Link>
          <Link to="/upload" className="text-[var(--text)] hover:text-gray-600 font-medium">
            Upload
          </Link>
          <Link to="/leaderboard" className="text-[var(--text)] hover:text-gray-600 font-medium">
            Leaderboard
          </Link>
        </nav>

        {/* Right Section - Profile & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle (Visible in Desktop) */}
          <div className="hidden md:block relative w-16 h-8 bg-gray-300 dark:bg-gray-800 rounded-full p-1 cursor-pointer">
            <motion.div
              className="absolute top-1 left-1 w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md"
              onClick={() => setDarkMode(!darkMode)}
              animate={{ x: darkMode ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {darkMode ? <FaMoon className="text-gray-800" /> : <FaSun className="text-yellow-500" />}
            </motion.div>
          </div>

          {/* Profile Button */}
          <Link
            to="/profile"
            className="bg-[var(--bg)] text-[var(--background)] px-3 py-3 rounded-full font-medium flex items-center"
          >
            <FaUser />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl text-[var(--text)]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[var(--background)] py-4 z-10 px-6 absolute top-16 left-0 w-full shadow-md rounded-b-3xl">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link
                to="/"
                className="text-[var(--text)] hover:text-gray-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="text-[var(--text)] hover:text-gray-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="text-[var(--text)] hover:text-gray-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="text-[var(--text)] hover:text-gray-600 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Leaderboard
              </Link>
            </li>

            {/* Dark Mode Toggle (Visible in Mobile Menu) */}
            <li className="flex justify-center mt-4">
              <div className="relative w-16 h-8 bg-gray-300 dark:bg-gray-800 rounded-full p-1 cursor-pointer">
                <motion.div
                  className="absolute top-1 left-1 w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md"
                  onClick={() => setDarkMode(!darkMode)}
                  animate={{ x: darkMode ? 32 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {darkMode ? <FaMoon className="text-gray-800" /> : <FaSun  />}
                </motion.div>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
