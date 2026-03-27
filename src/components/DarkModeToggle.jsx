import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    return (
        <motion.button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: darkMode ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Toggle dark mode"
        >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </motion.button>
    );
};

export default DarkModeToggle;
