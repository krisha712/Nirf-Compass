import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { apiGetHistory } from '@/services/apiService';
import { Calendar, FileText, User, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function SearchHistoryPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchHistory();
  }, [isAuthenticated]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await apiGetHistory();
      setHistory(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your search history.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Go to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search History</h1>
          <p className="text-gray-600">
            {history.length} {history.length === 1 ? 'analysis' : 'analyses'} found
          </p>
        </div>
        <button
          onClick={fetchHistory}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-16 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-primary" />
          <p>Loading history...</p>
        </div>
      )}

      {/* History List */}
      {!loading && history.length > 0 && (
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.university_name}
                  </h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.timestamp)}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/analysis')}
                  className="text-sm text-primary hover:text-primary-dark font-medium"
                >
                  Analyze Again
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && history.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No History Found</h3>
          <p className="text-gray-600 mb-6">Start analyzing universities to build your search history</p>
          <button onClick={() => navigate('/analysis')} className="btn-primary">
            Start New Analysis
          </button>
        </motion.div>
      )}
    </div>
  );
}
