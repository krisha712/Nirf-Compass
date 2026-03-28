import { useState } from 'react';
import { ChevronDown, AlertCircle, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function ParameterAccordion({ parameter }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const getRiskColor = (risk) => {
    if (risk === 'High') return 'text-red-600 bg-red-50';
    if (risk === 'Medium') return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };
  
  return (
    <div className="card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {parameter.name}
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">
              Score: <span className="font-semibold">{parameter.score}/100</span>
            </span>
            <span className={cn(
              'px-2 py-1 rounded text-xs font-medium',
              getRiskColor(parameter.riskLevel)
            )}>
              {parameter.riskLevel} Risk
            </span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-gray-400 transition-transform',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>
      
      {isOpen && (
        <div className="mt-6 space-y-6 pt-6 border-t border-gray-200">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-gray-900">Benchmark Gap</h4>
            </div>
            <p className="text-sm text-gray-600 ml-6">{parameter.benchmarkGap}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-gray-900">Priority Level</h4>
            </div>
            <p className="text-sm text-gray-600 ml-6">{parameter.priority}</p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h4 className="font-semibold text-gray-900">Strategic Action Steps</h4>
            </div>
            <ul className="space-y-2 ml-6">
              {parameter.actionSteps.map((step, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                  {step}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-1 text-sm">Expected Outcome</h4>
            <p className="text-sm text-blue-700">{parameter.expectedOutcome}</p>
          </div>
        </div>
      )}
    </div>
  );
}
