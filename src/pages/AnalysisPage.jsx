import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Search, Calendar } from 'lucide-react';
import { useAnalysisStore } from '@/store/analysisStore';
import { useHistoryStore } from '@/store/historyStore';
import { useAuthStore } from '@/store/authStore';
import { apiAnalyze, apiSaveHistory } from '@/services/apiService';
import LoadingAnalysis from '@/components/LoadingAnalysis';
import ScoreCard from '@/components/ScoreCard';
import ParameterAccordion from '@/components/ParameterAccordion';
import PeerComparisonTable from '@/components/PeerComparisonTable';
import RankSimulator from '@/components/RankSimulator';
import SimilarityFinder from '@/components/SimilarityFinder';

/**
 * Map backend response to the shape expected by frontend components.
 * Backend: { selected_university, top_universities, comparison, performance_insights }
 */
function mapBackendResponse(raw, universityName) {
  const sel = raw.selected_university;
  const scores = sel.scores;

  // Build parameters array (ScoreCard / ParameterAccordion format)
  const paramMeta = {
    tlr: { label: 'Teaching, Learning & Resources', maxScore: 100, weight: 30 },
    rp:  { label: 'Research & Professional Practice', maxScore: 100, weight: 30 },
    go:  { label: 'Graduation Outcomes', maxScore: 100, weight: 20 },
    oi:  { label: 'Outreach & Inclusivity', maxScore: 100, weight: 10 },
    pr:  { label: 'Perception', maxScore: 100, weight: 10 },
  };

  const parameters = Object.entries(paramMeta).map(([id, meta]) => ({
    id,
    name: meta.label,
    score: scores[id],
    maxScore: meta.maxScore,
    weight: meta.weight,
    recommendations: (raw.performance_insights.find(i => i.parameter === id)?.recommendations) || [],
    gap: raw.performance_insights.find(i => i.parameter === id)?.gap || 0,
  }));

  // Build peers array (PeerComparisonTable format)
  const peers = raw.top_universities.map((u) => ({
    name: u.name,
    rank: u.rank,
    scores: {
      tlr: u.scores.tlr,
      rp:  u.scores.rp,
      go:  u.scores.go,
      oi:  u.scores.oi,
      pr:  u.scores.pr,
      overall: u.scores.overall,
    },
  }));

  return {
    universityName: sel.name || universityName,
    rank: sel.rank,
    overallScore: scores.overall,
    parameters,
    peers,
    performanceInsights: raw.performance_insights,
    timestamp: new Date().toISOString(),
  };
}

export default function AnalysisPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showResults, setShowResults] = useState(false);

  const { analysisData, isAnalyzing, setAnalysisData, setIsAnalyzing, setError } = useAnalysisStore();
  const { addToHistory } = useHistoryStore();
  const { userEmail } = useAuthStore();

  const onSubmit = async (data) => {
    try {
      setIsAnalyzing(true);
      setShowResults(false);

      const raw = await apiAnalyze(data.universityName);
      const result = mapBackendResponse(raw, data.universityName);

      setAnalysisData(result);
      addToHistory(result, userEmail);

      // Save to backend DB (non-blocking)
      apiSaveHistory(data.universityName).catch(() => {});

      setShowResults(true);
      toast.success('Analysis completed successfully!');
    } catch (error) {
      setError(error.message);
      toast.error(error.message || 'Failed to analyze university. Please try again.');
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">University Analysis</h1>
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
            <p className="text-gray-500 text-sm">
              Rank #{analysisData.rank} &nbsp;·&nbsp; Overall Score: {analysisData.overallScore}
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-500 mt-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                Analyzed on {new Date(analysisData.timestamp).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Scores */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">NIRF Parameter Scores</h2>
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

          {/* Peer Comparison */}
          <PeerComparisonTable
            peers={analysisData.peers}
            selectedName={analysisData.universityName}
          />

          {/* Rank Improvement Simulator */}
          <RankSimulator analysisData={analysisData} />

          {/* Similarity Finder */}
          <SimilarityFinder analysisData={analysisData} />

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
            <button onClick={() => navigate('/roadmap')} className="btn-primary">
              View Improvement Roadmap
            </button>
            <button onClick={() => navigate('/report')} className="btn-secondary">
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
