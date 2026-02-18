import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, Calendar } from 'lucide-react';
import { useAnalysisStore } from '@/store/analysisStore';
import { useHistoryStore } from '@/store/historyStore';
import { analyzeUniversity } from '@/services/nirfService';
import LoadingAnalysis from '@/components/LoadingAnalysis';
import ScoreCard from '@/components/ScoreCard';
import ParameterAccordion from '@/components/ParameterAccordion';

export default function AnalysisPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showResults, setShowResults] = useState(false);
  
  const {
    analysisData,
    isAnalyzing,
    setAnalysisData,
    setIsAnalyzing,
    setError,
  } = useAnalysisStore();
  
  const { addToHistory } = useHistoryStore();
  
  const onSubmit = async (data) => {
    try {
      setIsAnalyzing(true);
      setShowResults(false);
      
      const result = await analyzeUniversity(data.universityName);
      setAnalysisData(result);
      addToHistory(result); // Save to history
      setShowResults(true);
      
      toast.success('Analysis completed successfully!');
    } catch (error) {
      setError(error.message);
      toast.error('Failed to analyze university. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Input Section */}
      {!showResults && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              University Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Enter the university name to begin AI-powered NIRF analysis
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="card">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              University Name
            </label>
            <input
              type="text"
              {...register('universityName', {
                required: 'University name is required',
                minLength: { value: 3, message: 'Name must be at least 3 characters' },
              })}
              className="input-field"
              placeholder="e.g., IIT Delhi, AIIMS Delhi"
              disabled={isAnalyzing}
            />
            {errors.universityName && (
              <p className="text-red-600 text-sm mt-2">{errors.universityName.message}</p>
            )}
            
            <button
              type="submit"
              disabled={isAnalyzing}
              className="btn-primary w-full mt-6 flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>{isAnalyzing ? 'Analyzing...' : 'Analyze University'}</span>
            </button>
          </form>
        </div>
      )}
      
      {/* Loading State */}
      {isAnalyzing && <LoadingAnalysis />}
      
      {/* Results Section */}
      {showResults && analysisData && !isAnalyzing && (
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {analysisData.universityName}
            </h1>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                Data analyzed on {new Date(analysisData.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          
          {/* Auto-Generated Scores */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Auto-Generated NIRF Scores
              </h2>
              <button
                onClick={() => setShowResults(false)}
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                Analyze Another University
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analysisData.parameters.map((param) => (
                <ScoreCard key={param.id} parameter={param} />
              ))}
            </div>
          </section>
          
          {/* Strategic Analysis */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Strategic Analysis & Recommendations
            </h2>
            
            <div className="space-y-4">
              {analysisData.parameters.map((param) => (
                <ParameterAccordion key={param.id} parameter={param} />
              ))}
            </div>
          </section>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/roadmap')}
              className="btn-primary"
            >
              View Improvement Roadmap
            </button>
            <button
              onClick={() => navigate('/report')}
              className="btn-secondary"
            >
              Download Strategic Report
            </button>
          </div>
        </div>
      )}
      
      {/* Empty State */}
      {!showResults && !isAnalyzing && !analysisData && (
        <div className="text-center py-16 text-gray-500">
          <p>No analysis generated yet. Enter a university name to begin.</p>
        </div>
      )}
    </div>
  );
}
