import { useState, useMemo } from 'react';
import { TrendingUp, RotateCcw, Sliders } from 'lucide-react';
import { cn } from '@/utils/cn';
import { nirfRankedDataset } from '@/services/nirfService';

// NIRF official weightage
const WEIGHTS = { tlr: 0.30, rp: 0.30, go: 0.20, oi: 0.10, pr: 0.10 };

const PARAMS = [
  { key: 'tlr', label: 'Teaching, Learning & Resources', color: 'blue'   },
  { key: 'rp',  label: 'Research & Professional Practice', color: 'indigo' },
  { key: 'go',  label: 'Graduation Outcomes',              color: 'green'  },
  { key: 'oi',  label: 'Outreach & Inclusivity',           color: 'orange' },
  { key: 'pr',  label: 'Perception',                       color: 'purple' },
];

const TRACK_COLORS = {
  blue:   { track: 'accent-blue-500',   bg: 'bg-blue-500'   },
  indigo: { track: 'accent-indigo-500', bg: 'bg-indigo-500' },
  green:  { track: 'accent-green-500',  bg: 'bg-green-500'  },
  orange: { track: 'accent-orange-500', bg: 'bg-orange-500' },
  purple: { track: 'accent-purple-500', bg: 'bg-purple-500' },
};

function calcOverall(s) {
  return Math.round(s.tlr * WEIGHTS.tlr + s.rp * WEIGHTS.rp + s.go * WEIGHTS.go + s.oi * WEIGHTS.oi + s.pr * WEIGHTS.pr);
}

// Estimate rank by counting how many dataset entries beat the simulated overall
function estimateRank(overall, currentName) {
  const beaten = nirfRankedDataset.filter(
    (u) => u.name !== currentName && u.overall > overall
  ).length;
  return beaten + 1;
}

// Mini horizontal bar for score comparison
function ScoreBar({ label, current, simulated, color }) {
  const c = TRACK_COLORS[color];
  const diff = simulated - current;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-500">
        <span>{label}</span>
        <span className={cn('font-semibold', diff > 0 ? 'text-green-600' : 'text-gray-500')}>
          {current} → {simulated} {diff > 0 && <span>(+{diff})</span>}
        </span>
      </div>
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        {/* current */}
        <div className="absolute h-full bg-gray-300 rounded-full" style={{ width: current + '%' }} />
        {/* simulated overlay */}
        <div className={cn('absolute h-full rounded-full opacity-80', c.bg)} style={{ width: simulated + '%' }} />
      </div>
    </div>
  );
}

// Simple SVG bar chart comparing current vs simulated per param
function ComparisonChart({ current, simulated }) {
  const barW = 28;
  const gap = 14;
  const groupW = barW * 2 + gap;
  const totalW = PARAMS.length * (groupW + 20);
  const chartH = 140;
  const maxVal = 100;

  return (
    <svg viewBox={`0 0 ${totalW} ${chartH + 40}`} className="w-full">
      {/* Y grid lines */}
      {[25, 50, 75, 100].map((v) => {
        const y = chartH - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <line x1={0} y1={y} x2={totalW} y2={y} stroke="#f3f4f6" strokeWidth="1" />
            <text x={2} y={y - 2} fontSize="8" fill="#9ca3af">{v}</text>
          </g>
        );
      })}

      {PARAMS.map((p, i) => {
        const x = i * (groupW + 20) + 20;
        const curH = (current[p.key] / maxVal) * chartH;
        const simH = (simulated[p.key] / maxVal) * chartH;
        const improved = simulated[p.key] > current[p.key];

        return (
          <g key={p.key}>
            {/* Current bar */}
            <rect x={x} y={chartH - curH} width={barW} height={curH} fill="#cbd5e1" rx="3" />
            {/* Simulated bar */}
            <rect
              x={x + barW + gap}
              y={chartH - simH}
              width={barW}
              height={simH}
              fill={improved ? '#22c55e' : '#94a3b8'}
              rx="3"
            />
            {/* Label */}
            <text x={x + barW} y={chartH + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill="#6b7280">
              {p.key.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x={totalW - 120} y={chartH + 24} width={10} height={10} fill="#cbd5e1" rx="2" />
      <text x={totalW - 106} y={chartH + 33} fontSize="9" fill="#6b7280">Current</text>
      <rect x={totalW - 60} y={chartH + 24} width={10} height={10} fill="#22c55e" rx="2" />
      <text x={totalW - 46} y={chartH + 33} fontSize="9" fill="#6b7280">Simulated</text>
    </svg>
  );
}

export default function RankSimulator({ analysisData }) {
  const currentScores = analysisData.scores;
  const universityName = analysisData.universityName;

  const [sim, setSim] = useState({ ...currentScores });

  const currentOverall = useMemo(() => calcOverall(currentScores), [currentScores]);
  const simOverall     = useMemo(() => calcOverall(sim), [sim]);

  const currentRank  = useMemo(() => estimateRank(currentOverall, universityName), [currentOverall, universityName]);
  const simRank      = useMemo(() => estimateRank(simOverall, universityName), [simOverall, universityName]);
  const rankImproved = currentRank - simRank;

  const reset = () => setSim({ ...currentScores });

  const changed = PARAMS.some((p) => sim[p.key] !== currentScores[p.key]);

  return (
    <section className="space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sliders className="w-6 h-6 text-primary" />
            Rank Improvement Simulator
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Adjust parameter scores to see how improvements affect your NIRF rank.
          </p>
        </div>
        {changed && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-6 items-start">
        {/* ── Left: sliders ── */}
        <div className="card space-y-6">
          {PARAMS.map((p) => {
            const c = TRACK_COLORS[p.color];
            const diff = sim[p.key] - currentScores[p.key];
            return (
              <div key={p.key}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">{p.label}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Current: {currentScores[p.key]}</span>
                    <span className={cn(
                      'text-sm font-bold w-10 text-right',
                      diff > 0 ? 'text-green-600' : 'text-gray-700'
                    )}>
                      {sim[p.key]}
                    </span>
                    {diff > 0 && (
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">
                        +{diff}
                      </span>
                    )}
                  </div>
                </div>
                <input
                  type="range"
                  min={currentScores[p.key]}
                  max={100}
                  value={sim[p.key]}
                  onChange={(e) => setSim((prev) => ({ ...prev, [p.key]: Number(e.target.value) }))}
                  className={cn('w-full h-2 rounded-lg cursor-pointer', c.track)}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{currentScores[p.key]} (current)</span>
                  <span>100</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Right: rank result card ── */}
        <div className="space-y-4">
          {/* Rank summary */}
          <div className="card text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Rank Estimate</p>
            <div className="grid grid-cols-3 gap-2 items-center">
              <div>
                <p className="text-3xl font-bold text-gray-700">#{currentRank}</p>
                <p className="text-xs text-gray-400 mt-1">Current</p>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className={cn('w-6 h-6', rankImproved > 0 ? 'text-green-500' : 'text-gray-300')} />
                <span className={cn(
                  'text-sm font-bold mt-1',
                  rankImproved > 0 ? 'text-green-600' : 'text-gray-400'
                )}>
                  {rankImproved > 0 ? `+${rankImproved}` : '—'}
                </span>
              </div>
              <div>
                <p className={cn('text-3xl font-bold', rankImproved > 0 ? 'text-green-600' : 'text-gray-700')}>
                  #{simRank}
                </p>
                <p className="text-xs text-gray-400 mt-1">Simulated</p>
              </div>
            </div>

            {/* Overall score */}
            <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400">Current Overall</p>
                <p className="text-2xl font-bold text-gray-700">{currentOverall}</p>
              </div>
              <div className={cn('rounded-lg p-3', simOverall > currentOverall ? 'bg-green-50' : 'bg-gray-50')}>
                <p className="text-xs text-gray-400">Simulated Overall</p>
                <p className={cn('text-2xl font-bold', simOverall > currentOverall ? 'text-green-600' : 'text-gray-700')}>
                  {simOverall}
                  {simOverall > currentOverall && (
                    <span className="text-sm ml-1">(+{simOverall - currentOverall})</span>
                  )}
                </p>
              </div>
            </div>

            {rankImproved > 0 && (
              <p className="mt-4 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2">
                Improving these parameters could move <span className="font-semibold">{universityName}</span> up
                by <span className="font-semibold">{rankImproved} position{rankImproved > 1 ? 's' : ''}</span> in the NIRF ranking.
              </p>
            )}
          </div>

          {/* Per-param score bars */}
          <div className="card space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Score Comparison</p>
            {PARAMS.map((p) => (
              <ScoreBar
                key={p.key}
                label={p.key.toUpperCase()}
                current={currentScores[p.key]}
                simulated={sim[p.key]}
                color={p.color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="card">
        <p className="text-sm font-semibold text-gray-700 mb-4">Parameter Comparison Chart</p>
        <ComparisonChart current={currentScores} simulated={sim} />
      </div>
    </section>
  );
}
