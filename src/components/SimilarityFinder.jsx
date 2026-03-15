import { useMemo } from 'react';
import { GitCompare, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';
import { getSimilarUniversities } from '@/services/nirfService';

const PARAMS = [
  { key: 'tlr', label: 'TLR' },
  { key: 'rp',  label: 'RP'  },
  { key: 'go',  label: 'GO'  },
  { key: 'oi',  label: 'OI'  },
  { key: 'pr',  label: 'PR'  },
];

const scoreColor = (v) =>
  v >= 80 ? 'text-green-600' : v >= 60 ? 'text-yellow-600' : 'text-red-500';

// Similarity badge: closer distance = higher similarity %
// Max meaningful distance across 5 params (each 0-100) ≈ 223 (sqrt(5)*100)
const MAX_DIST = 223;
function similarityPct(distance) {
  return Math.max(0, Math.round((1 - distance / MAX_DIST) * 100));
}

function SimilarityBar({ pct }) {
  const color =
    pct >= 90 ? 'bg-green-500' :
    pct >= 75 ? 'bg-blue-500'  :
    pct >= 60 ? 'bg-yellow-500' : 'bg-gray-400';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full', color)} style={{ width: pct + '%' }} />
      </div>
      <span className="text-xs font-semibold text-gray-600 w-8 text-right">{pct}%</span>
    </div>
  );
}

// Diff chip: shows +/- delta vs selected university
function DiffChip({ delta }) {
  if (delta === 0) return <Minus className="w-3 h-3 text-gray-300 mx-auto" />;
  return (
    <span className={cn(
      'text-xs font-medium',
      delta > 0 ? 'text-green-600' : 'text-red-500'
    )}>
      {delta > 0 ? '+' : ''}{delta}
    </span>
  );
}

export default function SimilarityFinder({ analysisData }) {
  const { universityName, scores } = analysisData;

  const similar = useMemo(
    () => getSimilarUniversities(universityName),
    [universityName]
  );

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-primary" />
          Universities with Similar Performance Profiles
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Ranked by Euclidean distance across TLR, RP, GO, OI and PR score vectors.
          Closer distance = more similar overall profile.
        </p>
      </div>

      {/* Legend row */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
        <span>Similarity % = how close the score profile is to <span className="font-medium text-gray-600">{universityName}</span></span>
        <span className="ml-auto italic">
          Diff columns show score delta vs {universityName}
        </span>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              <th className="px-5 py-3 text-left">Rank</th>
              <th className="px-5 py-3 text-left">University</th>
              <th className="px-5 py-3 text-center">Similarity</th>
              {PARAMS.map((p) => (
                <th key={p.key} className="px-3 py-3 text-center">{p.label}</th>
              ))}
              <th className="px-5 py-3 text-center">Overall</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Selected university row */}
            <tr className="bg-blue-50">
              <td className="px-5 py-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold">
                  —
                </span>
              </td>
              <td className="px-5 py-3">
                <span className="font-semibold text-blue-700">{universityName}</span>
                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">Selected</span>
              </td>
              <td className="px-5 py-3 text-center">
                <span className="text-xs text-gray-400 italic">—</span>
              </td>
              {PARAMS.map((p) => (
                <td key={p.key} className="px-3 py-3 text-center">
                  <span className={cn('font-semibold', scoreColor(scores[p.key]))}>
                    {scores[p.key]}
                  </span>
                </td>
              ))}
              <td className="px-5 py-3 text-center font-bold text-blue-700">
                {Math.round(scores.tlr * 0.3 + scores.rp * 0.3 + scores.go * 0.2 + scores.oi * 0.1 + scores.pr * 0.1)}
              </td>
            </tr>

            {/* Similar universities */}
            {similar.map((uni, idx) => {
              const pct = similarityPct(uni.distance);
              return (
                <tr key={uni.rank} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-xs font-bold">
                      {uni.rank}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 truncate max-w-[200px]">{uni.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Distance: {uni.distance}</p>
                  </td>
                  <td className="px-5 py-3 min-w-[120px]">
                    <SimilarityBar pct={pct} />
                  </td>
                  {PARAMS.map((p) => (
                    <td key={p.key} className="px-3 py-3 text-center">
                      <span className={cn('font-semibold block', scoreColor(uni.scores[p.key]))}>
                        {uni.scores[p.key]}
                      </span>
                      <DiffChip delta={uni.scores[p.key] - scores[p.key]} />
                    </td>
                  ))}
                  <td className="px-5 py-3 text-center font-bold text-gray-800">
                    {uni.overall}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 text-right">
        Algorithm: Euclidean distance on [TLR, RP, GO, OI, PR] score vector · Top 5 closest matches shown
      </p>
    </section>
  );
}
