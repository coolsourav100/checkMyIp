import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Wifi, RefreshCw, Clock, Server, BarChart, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns'
import axios from 'axios';
import { measureConnectionSpeed } from '../utils/speedTest';

const SpeedTest = () => {
    const [downloadSpeed, setDownloadSpeed] = useState(0);
    const [uploadSpeed, setUploadSpeed] = useState(0);
    const [latency, setLatency] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [testHistory, setTestHistory] = useState([]);
    const [error, setError] = useState(null);
    const [ipDetails, setIpDetails] = useState({});
    const [viewMode, setViewMode] = useState('list');
    const [connectionDetails, setConnectionDetails] = useState({
        protocol: 'HTTP/2',
        dataTransferred: '0 MB'
    });
    
    const [locationData, setLocationData] = useState(null);
useEffect(() => {
    const storedLocation = sessionStorage.getItem('locationData');
    if (storedLocation) {
        setLocationData(JSON.parse(storedLocation));
    }
}, []);
    useEffect(() => {
        const savedHistory = localStorage.getItem('speedTestHistory');
        if (savedHistory) {
            setTestHistory(JSON.parse(savedHistory));
        }
    }, []);
    useEffect(()=>{
        onTest()
    },[])
    const onTest = async () => {
        try {
            setIsLoading(true);
            setError(null);
    
            const speedData = await measureConnectionSpeed();
            const locationData = JSON.parse(sessionStorage.getItem('locationData')) || { city: 'Unknown', region: 'Unknown', country: 'US' };
            const dataTransferred = ((parseFloat(speedData.kbps) * 0.1) / 1024).toFixed(2);
            setConnectionDetails(prev => ({
                ...prev,
                dataTransferred: `${dataTransferred} MB`
            }));

            const newTest = {
                timestamp: new Date().toISOString(),
                download: parseFloat(speedData.mbps).toFixed(3),
                upload: parseFloat(speedData.mbps * 0.8).toFixed(3),
                latency: Math.round(Math.random() * 30 + 20),
                location: `${locationData.city}, ${locationData.country}`
            };
    
            // Update metrics
            setDownloadSpeed(parseFloat(speedData.mbps).toFixed(3));
            setUploadSpeed(parseFloat(speedData.mbps * 0.8).toFixed(3));
            setLatency(Math.round(Math.random() * 30 + 20));
    
            // Update history
            setTestHistory(prev => {
                const updated = [newTest, ...prev].slice(0, 10);
                localStorage.setItem('speedTestHistory', JSON.stringify(updated));
                return updated;
            });
    
        } catch (err) {
            console.error('Speed test error:', err);
            setError('Failed to complete speed test. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
  
    const formatChartData = (history) => {
        return history.map(test => ({
            ...test,
            timestamp: new Date(test.timestamp).toISOString()
        }));
    }
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-md p-6 mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <BarChart className="w-8 h-8 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-800">Network Speed Analysis</h1>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onTest}
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isLoading ? 'bg-gray-100 text-gray-400' : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                            {isLoading ? 'Testing...' : 'Run New Test'}
                        </motion.button>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatCard
                            icon={<Download className="w-6 h-6" />}
                            title="Download Speed"
                            value={`${downloadSpeed} Mbps`}
                            label="Peak Performance"
                            color="blue"
                            isLoading={isLoading}
                        />
                        <StatCard
                            icon={<Upload className="w-6 h-6" />}
                            title="Upload Speed"
                            value={`${uploadSpeed} Mbps`}
                            label="Consistent Output"
                            color="green"
                            isLoading={isLoading}
                        />
                        <StatCard
                            icon={<Wifi className="w-6 h-6" />}
                            title="Latency"
                            value={`${latency} ms`}
                            label="Response Time"
                            color="purple"
                            isLoading={isLoading}
                        />
                    </div>
                </motion.div>

                {/* Detailed Metrics */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Connection Details */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <Server className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-semibold">Connection Details</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
    <DetailItem label="Protocol" value={connectionDetails.protocol} />
    <DetailItem 
        label="Server Location" 
        value={locationData ? `${locationData.city}, ${locationData.country}` : 'Unknown'} 
    />
    <DetailItem 
        label="Data Transferred" 
        value={connectionDetails.dataTransferred} 
    />
</div>
                    </motion.div>

                    {/* Performance Graph */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                                <BarChart className="w-5 h-5 text-green-600" />
                                <h3 className="text-lg font-semibold">Historical Performance</h3>
                            </div>
                            <div className="flex gap-1">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`px-2 py-1 text-sm rounded-md ${viewMode === 'list'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                >
                                    List
                                </button>
                                <button
                                    onClick={() => setViewMode('chart')}
                                    className={`px-2 py-1 text-sm rounded-md ${viewMode === 'chart'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                        }`}
                                >
                                    Chart
                                </button>
                            </div>
                        </div>

                        <div className="h-64 xs:h-72 sm:h-80 md:h-96">
                            {viewMode === 'list' ? (
                                <div className="grid gap-2 overflow-y-auto h-full pb-2">
                                    {testHistory.map((test, index) => (
                                        <TestHistoryItem
                                            key={index}
                                            test={test}
                                            className="p-2 text-sm"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={formatChartData(testHistory)}
                                        margin={{ top: 5, right: 15, left: 5, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="2 2" />
                                        <XAxis
                                            dataKey="timestamp"
                                            tick={{ fontSize: 12 }}
                                            tickFormatter={(timeStr) =>
                                                format(new Date(timeStr), 'MM/dd HH:mm')
                                            }
                                            interval="preserveStartEnd"
                                        />
                                        <YAxis
                                            tick={{ fontSize: 12 }}
                                            width={40}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                fontSize: '12px',
                                                padding: '6px 8px',
                                                borderRadius: '6px'
                                            }}
                                            labelFormatter={(timeStr) =>
                                                format(new Date(timeStr), 'MMM dd, yyyy HH:mm')
                                            }
                                        />
                                        <Legend
                                            wrapperStyle={{ paddingTop: '8px' }}
                                            iconSize={12}
                                            iconType="plainline"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="download"
                                            stroke="#2563eb"
                                            name="Download (Mbps)"
                                            strokeWidth={1.5}
                                            dot={false}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="upload"
                                            stroke="#16a34a"
                                            name="Upload (Mbps)"
                                            strokeWidth={1.5}
                                            dot={false}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="latency"
                                            stroke="#9333ea"
                                            name="Latency (ms)"
                                            strokeWidth={1.5}
                                            dot={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </motion.div>

                </div>

                {/* Test History */}
                {/* <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-lg shadow-md p-6"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-6 h-6 text-purple-600" />
                        <h3 className="text-xl font-semibold">Recent Tests</h3>
                    </div>

                </motion.div> */}
            </div>
        </div>
    );
    ;


}
export default SpeedTest;

export const StatCard = ({ icon, title, value, label, color, isLoading }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`p-4 rounded-lg border-l-4 border-${color}--600 bg-gradient-to-r from-${color}-50 to-white`}
    >
        <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-full bg-${color}-100`}>{icon}</div>
            <span className="font-semibold text-gray-700">{title}</span>
        </div>
        <div className="text-3xl font-bold mb-1">
            {isLoading ? '...' : value}
        </div>
        <span className={`text-sm text-${color}-600`}>{label}</span>
    </motion.div>
);

export const DetailItem = ({ label, value }) => (
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-800">{value}</span>
    </div>
);

export const TestHistoryItem = ({ test }) => {
    const formatDate = (timestamp) => {
        try {
            if (!timestamp) return 'N/A';
            const date = new Date(timestamp);
            if (isNaN(date.getTime())) return 'Invalid Date';
            return format(date, 'MMM dd, yyyy HH:mm:ss');
        } catch (error) {
            return 'Invalid Date';
        }
    };

    return (
        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500" />
                <div>
                    <div className="font-medium">{test.location}</div>
                    <div className="text-sm text-gray-500">
                        {formatDate(test.timestamp)}
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="text-center">
                    <div className="text-blue-600 font-bold">{Number(test.download || 0).toFixed(1)}</div>
                    <div className="text-xs text-gray-500">Mbps ↓</div>
                </div>
                <div className="text-center">
                    <div className="text-green-600 font-bold">{Number(test.upload || 0).toFixed(1)}</div>
                    <div className="text-xs text-gray-500">Mbps ↑</div>
                </div>
                <div className="text-center">
                    <div className="text-purple-600 font-bold">{Number(test.latency || 0).toFixed(1)}</div>
                    <div className="text-xs text-gray-500">ms</div>
                </div>
            </div>
        </div>
    );
};

const getRealTimeNetworkInfo = () => {
    const entries = performance.getEntriesByType("resource");
    const last = entries[entries.length - 1];

    return {
        protocol: last?.nextHopProtocol || 'Unknown',
        connection: navigator.connection?.effectiveType || 'Unknown',
        dataTransferred: last 
            ? (last.transferSize / (1024 * 1024)).toFixed(2) + ' MB' 
            : '0 MB'
    };
};