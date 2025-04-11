import React from 'react';
import { Globe, Gauge, Clock, Heart, Wifi, Server, Mail, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl rounded-2xl p-8 mb-8 text-white"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <Globe className="w-16 h-16 text-white/90" />
                        <div>
                            <h1 className="text-4xl font-bold mb-3">Network Intelligence Platform</h1>
                            <p className="text-lg text-white/90 max-w-2xl">
                                Advanced network diagnostics powered by AI-driven analysis and global monitoring infrastructure
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Tech Stack */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {['React.js 18', 'Tailwind CSS', 'Node.js'].map((tech, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200/50"
                        >
                            <div className="flex items-center gap-3">
                                <Code className="w-6 h-6 text-blue-600" />
                                <span className="font-medium text-gray-800">{tech}</span>
                            </div>
                        </motion.div>
                    ))}
                </div> */}

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {[
                        {
                            icon: <Gauge className="w-8 h-8 text-green-600" />,
                            title: "Performance Analytics",
                            features: ["Multi-thread testing", "Historical comparisons", "ISP benchmarking"]
                        },
                        {
                            icon: <Wifi className="w-8 h-8 text-purple-600" />,
                            title: "Network Security",
                            features: ["DNS leak detection", "VPN validation", "Encryption analysis"]
                        },
                        {
                            icon: <Server className="w-8 h-8 text-orange-600" />,
                            title: "Advanced Tools",
                            features: ["Packet loss testing", "Jitter measurement", "Route tracing"]
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className="bg-white shadow-lg rounded-xl p-6 border-2 border-transparent hover:border-blue-100 transition-all"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                            </div>
                            <ul className="space-y-3 pl-2">
                                {feature.features.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Core Technologies */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white shadow-lg rounded-2xl p-8 mb-8"
                >
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-3">
                        <Heart className="w-8 h-8 text-red-500" />
                        <span>Technical Excellence</span>
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-4 mb-4">
                                <Clock className="w-8 h-8 text-blue-500" />
                                <h4 className="text-xl font-semibold">Real-time Monitoring</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                24/7 network surveillance with millisecond-level precision monitoring,
                                providing instant alerts for performance anomalies.
                            </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-4 mb-4">
                                <Globe className="w-8 h-8 text-green-500" />
                                <h4 className="text-xl font-semibold">Global Infrastructure</h4>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                300+ global nodes across 6 continents ensure accurate regional
                                performance metrics and low-latency testing.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Key Metrics */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl rounded-2xl p-8 mb-8 text-white">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Gauge className="w-8 h-8 text-yellow-300" />
                        Performance Benchmarks
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { value: "1.2M+", label: "Tests Daily", color: "bg-green-400" },
                            { value: "98.7%", label: "Accuracy", color: "bg-blue-400" },
                            { value: "32ms", label: "Avg Latency", color: "bg-purple-400" },
                            { value: "∞", label: "Scalability", color: "bg-pink-400" }
                        ].map((metric, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="p-6 bg-white/10 rounded-xl backdrop-blur-sm"
                            >
                                <div className={`w-12 h-12 ${metric.color} rounded-full mx-auto mb-4`} />
                                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                                <div className="text-sm opacity-80">{metric.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Newsletter Section */}
                {/* <motion.div
                    whileHover={{ scale: 1.005 }}
                    className="bg-white shadow-lg rounded-2xl p-8 mb-8 text-center"
                >
                    <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
                    <p className="text-gray-600 mb-6">Get network insights and feature updates</p>

                    <div className="max-w-md mx-auto flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium"
                        >
                            Subscribe
                        </motion.button>
                    </div>
                </motion.div> */}

                {/* Copyright Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <div className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Check My IP. All rights reserved.<br />
                        <span className="mt-1 block">Built with ❤️ by Network Experts</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
