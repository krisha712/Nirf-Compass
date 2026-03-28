import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '@/store/analysisStore';
import { apiGetRoadmap, apiDownloadRoadmapPDF } from '@/services/apiService';
import { ArrowLeft, Download, TrendingUp, Clock, Target, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const PHASE_STYLES = {
  phase1: { border: 'border-red-200',    header: 'bg-red-600',    badge: 'bg-red-100 text-red-700',    dot: 'bg-red-500'    },
  phase2: { border: 'border-yellow-200', header: 'bg-yellow-600', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  phase3: { border: 'border-green-200',  header: 'bg-green-600',  badge: 'bg-green-100 text-green-700',  dot: 'bg-green-500'  },
};

const KEYS = ['tlr', 'rp', 'go', 'oi', 'pr'];
const LABELS = {
  tlr: 'Teaching, Learning & Resources',
  rp:  'Research & Professional Practice',
  go:  'Graduation Outcomes',
  oi:  'Outreach & Inclusivity',
  pr:  'Perception',
};

function ScoreRow({ k, score, avg }) {
  const gap = avg - score;
  const pct = Math.min(100, score);
  const color = score < 40 ? 'bg-red-500' : score <= 60 ? 'bg-yellow-500' : 'bg-green-500';
  return (
    <div className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-0">
      <div className="w-44 shrink-0 text-sm font-medium text-gray-700">{LABELS[k]}</div>
      <div className="flex-1">
        <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
          <div className="absolute top-0 h-full w-0.5 bg-blue-400 opacity-70" style={{ left: `${Math.min(100, avg)}%` }} />
        </div>
      </div>
      <div className="w-16 text-right text-sm font-bold text-gray-800">{score}</div>
      <div className="w-16 text-right text-sm text-gray-500">{avg}</div>
      <div className="w-16 text-right text-xs font-semibold">
        {gap > 0
          ? <span className="text-orange-600">+{gap.toFixed(1)}</span>
          : <span className="text-green-600">✓</span>}
      </div>
    </div>
  );
}

function PhaseCard({ phaseKey, phase, index }) {
  const s = PHASE_STYLES[phaseKey];
  if (!phase.items || phase.items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      className={`border-2 ${s.border} rounded-xl overflow-hidden`}
    >
      {/* Header */}
      <div className={`${s.header} text-white px-6 py-5`}>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold">{phase.title}</h2>
          <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-lg text-sm">
            <Clock className="w-3.5 h-3.5" />
            {phase.duration}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm opacity-90">
          <Target className="w-3.5 h-3.5" />
          Focus: {phase.focus}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        {/* Point-wise actions per parameter */}
        <div className="space-y-4">
          {phase.items.map((item) => (
            <div key={item.parameter} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-sm">{item.label}</h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.badge}`}>
                  Score {item.score} · Gap +{item.gap.toFixed(1)}
                </span>
              </div>
              <ul className="space-y-2">
                {item.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function RoadmapPage() {
  const navigate = useNavigate();
  const { analysisData } = useAnalysisStore();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    if (!analysisData?.universityName) return;
    setLoading(true);
    apiGetRoadmap(analysisData.universityName)
      .then(setRoadmap)
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  }, [analysisData?.universityName]);

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      await apiDownloadRoadmapPDF(analysisData.universityName);
      toast.success('PDF downloaded!');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setPdfLoading(false);
    }
  };

  if (!analysisData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-gray-500 mb-4">No analysis data available.</p>
        <button onClick={() => navigate('/analysis')} className="btn-primary">Start Analysis</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/analysis')} className="flex items-center gap-2 text-primary hover:text-primary-dark">
          <ArrowLeft className="w-4 h-4" />
          Back to Analysis
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading || !roadmap}
          className="btn-primary flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {pdfLoading ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">Strategic Improvement Roadmap</h1>
        <p className="text-lg text-gray-600">{analysisData.universityName}</p>
        <p className="text-sm text-gray-400 mt-1">
          Phase-wise recommendations based on score gaps vs top-10 NIRF universities
        </p>
      </div>

      {loading && (
        <div className="text-center py-20 text-gray-500">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p>Generating your personalized roadmap...</p>
        </div>
      )}

      {roadmap && !loading && (
        <div className="space-y-8">
          {/* Performance Gaps table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Performance Gaps vs Top-10 Average
            </h2>
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-2 px-0">
              <div className="w-44" />
              <div className="flex-1 text-center">Score bar</div>
              <div className="w-16 text-right">Yours</div>
              <div className="w-16 text-right">Top-10</div>
              <div className="w-16 text-right">Gap</div>
            </div>
            {KEYS.map((k) => (
              <ScoreRow key={k} k={k} score={roadmap.scores[k]} avg={roadmap.top10_avg[k]} />
            ))}
          </motion.div>

          {/* Phase summary strip */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: 'phase1', label: 'Critical (gap > 40)', color: 'bg-red-100 text-red-700' },
              { key: 'phase2', label: 'Moderate (gap 25–40)', color: 'bg-yellow-100 text-yellow-700' },
              { key: 'phase3', label: 'Long-term (gap < 25)', color: 'bg-green-100 text-green-700' },
            ].map((s) => (
              <div key={s.key} className={`rounded-xl p-4 text-center ${s.color}`}>
                <p className="text-3xl font-bold">{roadmap.phases[s.key].items.length}</p>
                <p className="text-xs font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Phase cards */}
          {Object.entries(roadmap.phases).map(([key, phase], i) => (
            <PhaseCard key={key} phaseKey={key} phase={phase} index={i} />
          ))}

          {/* All green state */}
          {Object.values(roadmap.phases).every(p => p.items.length === 0) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="card flex items-center gap-3 bg-green-50 border-green-200 text-green-800">
              <CheckCircle className="w-6 h-6 shrink-0" />
              <p>This university is performing at or above the top-10 average across all parameters. Focus on sustaining and extending this excellence.</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
