import React from 'react';
import { Mail, Linkedin, Phone, UserRound, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-md rounded-lg p-6 mb-8"
                >
                    <div className="flex items-center gap-4">
                        <Phone className="w-12 h-12 text-blue-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Contact & Support</h1>
                            <p className="text-gray-600 mt-2">
                                Get in touch for technical support, feature requests, or partnership inquiries
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-8 h-8 text-purple-600" />
                            <h3 className="text-xl font-semibold">Email Support</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                For technical issues and general inquiries:
                            </p>
                            <a
                                href="mailto:sourav.gepdec@gmail.com"
                                className="text-blue-600 hover:text-blue-800 break-all"
                            >
                                sourav.gepdec@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Linkedin className="w-8 h-8 text-blue-600" />
                            <h3 className="text-xl font-semibold">Professional Network</h3>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-600">
                                Connect with the developer on LinkedIn:
                            </p>
                            <a
                                href="https://www.linkedin.com/in/sourav-sarkar-dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                linkedin.com/in/sourav-sarkar-dev
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Developer Credit */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white shadow-md rounded-lg p-6 mt-8 border border-blue-200"
                >
                    <div className="flex items-center gap-4">
                        <Code2 className="w-12 h-12 text-blue-600" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <UserRound className="w-5 h-5" />
                                Development Team
                            </h2>
                            <p className="text-gray-600 mt-2">
                                This application was developed by
                                <span className="font-semibold ml-1">Sourav Sarkar</span>.
                                For collaboration opportunities or technical discussions,
                                please use the contact methods above.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
