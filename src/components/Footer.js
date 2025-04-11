import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white shadow-md mt-auto">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-600">
                            Check My IP provides comprehensive network analysis and speed testing tools.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
                            <li><Link to="/speedtest" className="text-gray-600 hover:text-blue-600">Speed Test</Link></li>
                            <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link></li>
                            <li><Link to="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Tools</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-blue-600">IP Checker</Link></li>
                            <li><Link to="/speedtest" className="text-gray-600 hover:text-blue-600">Network Speed</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-gray-600">
                            Questions? Reach out to us.
                        </p>
                        <Link to="/contact" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                            Get in touch
                        </Link>
                    </div>
                </div>
                <div className="border-t mt-8 pt-6 text-center">
                    <p className="text-gray-600">© {new Date().getFullYear()} Check My IP. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;