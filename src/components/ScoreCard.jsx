import { cn } from '@/utils/cn';

export default function ScoreCard({ parameter }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };
  
  const getLevelColor = (level) => {
    if (level === 'Strong') return 'bg-green-100 text-green-800';
    if (level === 'Moderate') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };
  
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {parameter.name}
          </h3>
          <span className={cn(
            'inline-block px-3 py-1 rounded-full text-xs font-medium',
            getLevelColor(parameter.performanceLevel)
          )}>
            {parameter.performanceLevel}
          </span>
        </div>
        <div className={cn(
          'flex items-center justify-center w-20 h-20 rounded-xl border-2 font-bold text-2xl',
          getScoreColor(parameter.score)
        )}>
          {parameter.score}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed">
        {parameter.assessment}
      </p>
    </div>
  );
}
