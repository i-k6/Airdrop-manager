import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust as needed for a slower loading effect

    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.nav 
      className="relative overflow-hidden mx-auto my-4 px-4 sm:px-8 rounded-full bg-gray-200 bg-opacity-50" 
      initial={{ width: isLoading ? '100%' : '90%' }}
      animate={{ width: '90%' }}
      transition={{ duration: 1.5 }} // Increase duration for a slower loading effect
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center h-16 rounded-full bg-gradient-to-r from-transparent to-transparent" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="flex-shrink-0 ml-4">
            <span className="text-white">Fm</span> {/* Change logo to "Fm" */}
          </div>
          <div className="flex flex-grow justify-center">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/dailylist" className="nav-link">Dailytask</Link>
            <Link to="" className="nav-link">Projects</Link>
            <Link to="/earnings" className="nav-link">Earnings</Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
