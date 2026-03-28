import { useMemo } from 'react';
import { GitCompare, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

const PARAMS = [
  { key: 'tlr', label: 'TLR' },
  { key: 'rp',  label: 'RP'  },
  { key: 'go',  label: 'GO'  },
  { key: 'oi',  label: 'OI'  },
  { key: 'pr',  label: 'PR'  },
];

const scoreColor = (v) =>
  v >= 80 ? 'text-green-600' : v >= 60 ? 'text-yellow-600' : 'text-red-500';

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

function DiffChip({ delta }) {
  if (delta === 0) return <Minus className="w-3 h-3 text-gray-300 mx-auto" />;
  return (
    <span className={cn('text-xs font-medium', delta > 0 ? 'text-green-600' : 'text-red-500')}>
      {delta > 0 ? '+' : ''}{delta}
    </span>
  );
}

// Full dataset for local similarity calculation
const DATASET = [
  { rank: 1,  name: "IISc Bangalore",                                       tlr: 95, rp: 98, go: 85, oi: 82, pr: 96 },
  { rank: 2,  name: "IIT Madras",                                           tlr: 91, rp: 94, go: 89, oi: 86, pr: 97 },
  { rank: 3,  name: "IIT Bombay",                                           tlr: 94, rp: 96, go: 90, oi: 87, pr: 99 },
  { rank: 4,  name: "IIT Delhi",                                            tlr: 92, rp: 95, go: 88, oi: 85, pr: 98 },
  { rank: 5,  name: "IIT Kharagpur",                                        tlr: 89, rp: 93, go: 87, oi: 84, pr: 95 },
  { rank: 6,  name: "IIT Kanpur",                                           tlr: 90, rp: 92, go: 86, oi: 83, pr: 94 },
  { rank: 7,  name: "IIT Roorkee",                                          tlr: 88, rp: 91, go: 85, oi: 82, pr: 93 },
  { rank: 8,  name: "IIT Guwahati",                                         tlr: 86, rp: 89, go: 84, oi: 81, pr: 91 },
  { rank: 9,  name: "AIIMS Delhi",                                          tlr: 88, rp: 92, go: 94, oi: 90, pr: 95 },
  { rank: 10, name: "JNU New Delhi",                                        tlr: 84, rp: 90, go: 80, oi: 85, pr: 89 },
  { rank: 11, name: "BHU Varanasi",                                         tlr: 82, rp: 87, go: 79, oi: 83, pr: 87 },
  { rank: 12, name: "Jadavpur University",                                  tlr: 81, rp: 86, go: 78, oi: 80, pr: 86 },
  { rank: 13, name: "Amrita Vishwa Vidyapeetham",                          tlr: 80, rp: 84, go: 82, oi: 79, pr: 85 },
  { rank: 14, name: "Vellore Institute of Technology",                     tlr: 79, rp: 83, go: 81, oi: 78, pr: 84 },
  { rank: 15, name: "University of Hyderabad",                             tlr: 78, rp: 85, go: 76, oi: 82, pr: 83 },
  { rank: 16, name: "NIT Trichy",                                           tlr: 77, rp: 82, go: 80, oi: 77, pr: 82 },
  { rank: 17, name: "Manipal Academy of Higher Education",                 tlr: 76, rp: 80, go: 79, oi: 76, pr: 81 },
  { rank: 18, name: "Saveetha Institute of Medical and Technical Sciences", tlr: 75, rp: 79, go: 78, oi: 75, pr: 80 },
  { rank: 19, name: "Symbiosis International University",                  tlr: 74, rp: 78, go: 77, oi: 74, pr: 79 },
  { rank: 20, name: "Thapar Institute of Engineering",                     tlr: 73, rp: 77, go: 76, oi: 73, pr: 78 },
];

function overall(u) {
  return Math.round(u.tlr * 0.3 + u.rp * 0.3 + u.go * 0.2 + u.oi * 0.1 + u.pr * 0.1);
}

function euclidean(a, b) {
  return Math.round(
    Math.sqrt(PARAMS.reduce((sum, p) => sum + Math.pow(a[p.key] - b[p.key], 2), 0)) * 10
  ) / 10;
}

function getSimilar(scores, selectedName) {
  return DATASET
    .filter((u) => u.name.toLowerCase() !== selectedName.toLowerCase())
    .map((u) => ({ ...u, overall: overall(u), distance: euclidean(scores, u) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 5);
}

export default function SimilarityFinder({ analysisData }) {
  const { universityName, parameters } = analysisData;

  // Build a flat scores object from the parameters array
  const scores = useMemo(() => {
    if (!parameters) return {};
    return parameters.reduce((acc, p) => ({ ...acc, [p.id]: p.score }), {});
  }, [parameters]);

  const similar = useMemo(
    () => getSimilar(scores, universityName),
    [scores, universityName]
  );

  if (!scores.tlr) return null;

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GitCompare className="w-6 h-6 text-primary" />
          Universities with Similar Performance Profiles
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Ranked by Euclidean distance across TLR, RP, GO, OI and PR score vectors.
        </p>
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
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold">—</span>
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
                {overall(scores)}
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
                      <span className={cn('font-semibold block', scoreColor(uni[p.key]))}>
                        {uni[p.key]}
                      </span>
                      <DiffChip delta={uni[p.key] - scores[p.key]} />
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
        Algorithm: Euclidean distance on [TLR, RP, GO, OI, PR] · Top 5 closest matches shown
      </p>
    </section>
  );
}
