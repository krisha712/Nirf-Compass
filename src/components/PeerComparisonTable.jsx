import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Trophy, Zap } from 'lucide-react';
import { cn } from '@/utils/cn';
import { computeInsights } from '@/services/nirfService';
import PerformanceInsights from './PerformanceInsights';

const scoreColor = (v) =>
  v >= 80 ? 'text-green-600' : v >= 60 ? 'text-yellow-600' : 'text-red-500';

const SCORE_COLS = [
  { key: 'tlr', label: 'TLR' },
  { key: 'rp',  label: 'RP'  },
  { key: 'go',  label: 'GO'  },
  { key: 'oi',  label: 'OI'  },
  { key: 'pr',  label: 'PR'  },
];

function Tag({ children, color = 'gray' }) {
  const colors = {
    blue:   'bg-blue-100 text-blue-700',
    green:  'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    gray:   'bg-gray-100 text-gray-600',
  };
  return (
    <span className={cn('inline-block px-2 py-0.5 rounded text-xs font-medium mr-1 mb-1', colors[color])}>
      {children}
    </span>
  );
}

function DetailPanel({ academic }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 px-6 py-5 bg-white border-t border-blue-100">
      {/* Programs */}
      <div>
        <div className="flex items-center gap-1.5 mb-3 text-gray-700 font-semibold text-sm">
          <BookOpen className="w-4 h-4 text-blue-500" />
          Academic Programs
        </div>
        <div className="flex flex-wrap">
          {academic.programs.map((p) => <Tag key={p} color="blue">{p}</Tag>)}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center gap-1.5 mb-3 text-gray-700 font-semibold text-sm">
          <Trophy className="w-4 h-4 text-yellow-500" />
          Major Achievements
        </div>
        <ul className="space-y-1.5">
          {academic.achievements.map((a) => (
            <li key={a} className="flex items-start gap-1.5 text-xs text-gray-600">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Activities */}
      <div>
        <div className="flex items-center gap-1.5 mb-3 text-gray-700 font-semibold text-sm">
          <Zap className="w-4 h-4 text-purple-500" />
          Key Activities & Initiatives
        </div>
        <ul className="space-y-1.5">
          {academic.activities.map((a) => (
            <li key={a} className="flex items-start gap-1.5 text-xs text-gray-600">
              <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function PeerComparisonTable({ peers, selectedName }) {
  const [expanded, setExpanded] = useState(null);
  const insights = computeInsights(peers, selectedName);

  const toggle = (rank) => setExpanded((prev) => (prev === rank ? null : rank));

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Peer Comparison</h2>
        <p className="text-sm text-gray-500 mt-1">
          Click any row to view academic programs, achievements, and key initiatives.
        </p>
      </div>

      {/* Score legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        <span>Score legend:</span>
        <span className="text-green-600 font-medium">≥ 80 Strong</span>
        <span className="text-yellow-600 font-medium">60–79 Moderate</span>
        <span className="text-red-500 font-medium">&lt; 60 Low</span>
        <span className="ml-auto text-gray-400 italic">
          TLR = Teaching &amp; Learning · RP = Research · GO = Graduation Outcomes · OI = Outreach &amp; Inclusivity · PR = Perception
        </span>
      </div>

      <div className="card overflow-hidden p-0 divide-y divide-gray-100">
        {/* Header */}
        <div className="grid grid-cols-[2rem_1fr_repeat(5,4rem)_4.5rem_2rem] gap-x-4 items-center
                        bg-gray-50 px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          <span>#</span>
          <span>University</span>
          {SCORE_COLS.map((c) => (
            <span key={c.key} className="text-center">{c.label}</span>
          ))}
          <span className="text-center">Overall</span>
          <span />
        </div>

        {peers.map((uni) => {
          const isSelected = uni.name === selectedName;
          const isOpen = expanded === uni.rank;

          return (
            <div key={uni.rank}>
              {/* Main row */}
              <button
                onClick={() => toggle(uni.rank)}
                className={cn(
                  'w-full grid grid-cols-[2rem_1fr_repeat(5,4rem)_4.5rem_2rem] gap-x-4 items-center',
                  'px-5 py-4 text-left transition-colors',
                  isSelected
                    ? 'bg-blue-50 hover:bg-blue-100'
                    : 'bg-white hover:bg-gray-50'
                )}
              >
                {/* Rank badge */}
                <span className={cn(
                  'inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold',
                  isSelected ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                )}>
                  {uni.rank}
                </span>

                {/* Name */}
                <span className="flex items-center gap-2 min-w-0">
                  <span className={cn(
                    'font-medium text-sm truncate',
                    isSelected ? 'text-blue-700' : 'text-gray-900'
                  )}>
                    {uni.name}
                  </span>
                  {isSelected && (
                    <span className="shrink-0 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                      Selected
                    </span>
                  )}
                </span>

                {/* NIRF scores */}
                {SCORE_COLS.map((c) => (
                  <span key={c.key} className={cn('text-center text-sm font-semibold', scoreColor(uni.scores[c.key]))}>
                    {uni.scores[c.key]}
                  </span>
                ))}

                {/* Overall */}
                <span className={cn(
                  'text-center text-sm font-bold',
                  isSelected ? 'text-blue-700' : 'text-gray-800'
                )}>
                  {uni.overall}
                </span>

                {/* Expand icon */}
                <span className="flex justify-center text-gray-400">
                  {isOpen
                    ? <ChevronUp className="w-4 h-4" />
                    : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {/* Expandable detail panel */}
              {isOpen && (
                <div className={cn(isSelected ? 'bg-blue-50/40' : 'bg-gray-50/60')}>
                  <DetailPanel academic={uni.academic} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 mt-2 text-right">
        Showing up to 5 universities ranked above the selected institution
      </p>

      {/* Performance Insights */}
      <PerformanceInsights insights={insights} />
    </section>
  );
}
