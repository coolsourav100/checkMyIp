import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <header className="bg-white shadow-md h-16 relative"> {/* Added relative positioning */}
            <nav className="container mx-auto px-4 h-full">
                <div className="flex items-center justify-between h-full">
                    <motion.div
                        className="flex items-center gap-1 shrink-0 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        style={{ cursor: 'pointer' }}
                    >
                        <Link
                            to="/"
                            className="flex items-center gap-1"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            {/* Logo Container */}
                            <div className="w-12 h-12 flex items-center justify-center overflow-hidden">
                                <img
                                    src={`${process.env.PUBLIC_URL}/logo.png`}
                                    alt="Check My IP Logo"
                                    className="w-auto h-full object-contain"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%'
                                    }}
                                />
                            </div>
                            <span className="text-lg font-bold text-gray-800">
                                Check My IP
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4 h-full">
                        <div className="flex space-x-6 h-full items-center">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/about" className="nav-link">About</Link>
                            <Link to="/speedtest" className="nav-link">Speed Test</Link>
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button - Updated styling */}
                    <button
                        className="md:hidden p-2 z-50 bg-white rounded-lg hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-800" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-800" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation - Updated styling */}
                {isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <div 
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        
                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween' }}
                            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-6"
                        >
                            <div className="flex flex-col gap-4 mt-12">
                                <Link
                                    to="/"
                                    className="text-gray-800 hover:text-blue-600 transition-colors text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-gray-800 hover:text-blue-600 transition-colors text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    to="/speedtest"
                                    className="text-gray-800 hover:text-blue-600 transition-colors text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Speed Test
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-gray-800 hover:text-blue-600 transition-colors text-lg"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
