import { TrendingDown, Lightbulb, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import RadarChart from './RadarChart';

const gapColor = (gap) => {
  if (gap >= 10) return { bar: 'bg-red-400',    badge: 'bg-red-50 text-red-700 border-red-200'    };
  if (gap >= 5)  return { bar: 'bg-yellow-400', badge: 'bg-yellow-50 text-yellow-700 border-yellow-200' };
  return             { bar: 'bg-blue-400',   badge: 'bg-blue-50 text-blue-700 border-blue-200'   };
};

export default function PerformanceInsights({ insights }) {
  if (!insights) return null;
  const { gaps, averages, selected } = insights;

  if (gaps.length === 0) {
    return (
      <section className="card border-green-200 bg-green-50">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
          <div>
            <p className="font-semibold text-green-800">Performing above peer average on all metrics</p>
            <p className="text-sm text-green-700 mt-0.5">
              {selected.name} scores higher than the top-ranked peers on every NIRF parameter.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Performance Insights</h2>
        <p className="text-sm text-gray-500 mt-1">
          Comparing <span className="font-medium text-gray-700">{selected.name}</span> against
          the average of the {insights.peerGroup.length} universities ranked above it.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">
        {/* Gap cards */}
        <div className="space-y-4">
          {gaps.map((g) => {
            const colors = gapColor(g.gap);
            const pct = Math.min((g.gap / 30) * 100, 100);
            return (
              <div key={g.key} className="card p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-800 text-sm">{g.label}</span>
                  </div>
                  <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full border', colors.badge)}>
                    -{g.gap} pts below peer avg
                  </span>
                </div>

                {/* Score bar */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{selected.name}</span>
                      <span className="font-semibold text-gray-700">{g.selected}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: g.selected + '%' }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Peer average</span>
                      <span className="font-semibold text-gray-700">{g.peerAvg}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all', colors.bar)}
                        style={{ width: g.peerAvg + '%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Gap indicator */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div
                    className={cn('h-full rounded-full', colors.bar)}
                    style={{ width: pct + '%' }}
                  />
                </div>

                {/* Recommendations */}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-gray-600">
                    <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                    Recommendations
                  </div>
                  <ul className="space-y-1">
                    {g.recommendations.map((r) => (
                      <li key={r} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Radar chart */}
        <div className="card p-5 sticky top-4">
          <p className="text-sm font-semibold text-gray-700 mb-1 text-center">Score Radar</p>
          <p className="text-xs text-gray-400 text-center mb-4">
            <span className="inline-block w-3 h-0.5 bg-blue-500 mr-1 align-middle" />Selected
            <span className="inline-block w-3 h-0.5 bg-indigo-400 border-dashed ml-3 mr-1 align-middle" />Peer avg
          </p>
          <RadarChart selected={selected.scores} peerAvg={averages} />
          <div className="mt-4 grid grid-cols-5 gap-1 text-center">
            {['tlr','rp','go','oi','pr'].map((k) => (
              <div key={k}>
                <div className="text-xs text-gray-400 uppercase">{k}</div>
                <div className="text-xs font-bold text-blue-600">{selected.scores[k]}</div>
                <div className="text-xs text-indigo-500">{averages[k]}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Blue = selected · Purple = avg</p>
        </div>
      </div>
    </section>
  );
}
