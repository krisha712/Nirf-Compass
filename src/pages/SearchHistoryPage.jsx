import { useNavigate } from 'react-router-dom';
import { useHistoryStore } from '@/store/historyStore';
import { useAnalysisStore } from '@/store/analysisStore';
import { generateReport } from '@/services/reportService';
import { generatePDFReport } from '@/services/pdfService';
import { Calendar, Download, Eye, Trash2, FileText } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function SearchHistoryPage() {
  const navigate = useNavigate();
  const { history, removeHistoryItem, clearHistory } = useHistoryStore();
  const { setAnalysisData } = useAnalysisStore();
  
  const handleViewAnalysis = (item) => {
    setAnalysisData(item.data);
    navigate('/analysis');
    toast.info(`Viewing analysis for ${item.universityName}`);
  };
  
  const handleDownloadPDF = (item) => {
    const report = generateReport(item.data);
    generatePDFReport(report);
    toast.success('PDF report downloaded successfully!');
  };
  
  const handleDelete = (id, universityName) => {
    removeHistoryItem(id);
    toast.success(`Removed ${universityName} from history`);
  };
  
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      toast.success('History cleared successfully');
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Search History</h1>
          <p className="text-gray-600">
            {history.length} {history.length === 1 ? 'analysis' : 'analyses'} saved
          </p>
        </div>
        
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>
      
      {/* History List */}
      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Left Section - Info */}
                <div className="flex-1">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.universityName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(item.date)}</span>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {item.status}
                        </span>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.data.parameters.slice(0, 3).map((param) => (
                          <span
                            key={param.id}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                          >
                            {param.id.toUpperCase()}: {param.score}
                          </span>
                        ))}
                        {item.data.parameters.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            +{item.data.parameters.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Section - Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleViewAnalysis(item)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  
                  <button
                    onClick={() => handleDownloadPDF(item)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </button>
                  
                  <button
                    onClick={() => handleDelete(item.id, item.universityName)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Previous Analyses Found
          </h3>
          <p className="text-gray-600 mb-6">
            Start analyzing universities to build your search history
          </p>
          <button
            onClick={() => navigate('/analysis')}
            className="btn-primary"
          >
            Start New Analysis
          </button>
        </motion.div>
      )}
      
      {/* Info Card */}
      {history.length > 0 && (
        <div className="mt-8 card bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">About Search History</h3>
              <p className="text-sm text-blue-800">
                Your analysis history is stored locally in your browser. You can view previous 
                analyses, download PDF reports, or remove entries at any time. Data persists 
                across sessions until manually cleared.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
