import { useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '@/store/analysisStore';
import { ArrowLeft, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoadmapPage() {
  const navigate = useNavigate();
  const { analysisData } = useAnalysisStore();
  
  if (!analysisData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">No analysis data available.</p>
          <button onClick={() => navigate('/analysis')} className="btn-primary">
            Start Analysis
          </button>
        </div>
      </div>
    );
  }
  
  const immediate = analysisData.parameters.filter(p => p.score < 60);
  const structural = analysisData.parameters.filter(p => p.score >= 60 && p.score < 75);
  const strategic = analysisData.parameters.filter(p => p.score >= 75);
  
  const phases = [
    {
      title: 'Phase 1: Immediate Actions',
      timeline: '0-6 months',
      focus: 'Critical Gap Resolution',
      color: 'red',
      parameters: immediate,
      improvements: [
        'Administrative: Streamline approval processes and resource allocation',
        'Academic: Implement faculty development programs and curriculum updates',
        'Research: Establish seed funding for research initiatives',
        'Infrastructure: Address critical facility gaps and safety concerns',
        'Policy: Update outdated policies affecting performance metrics',
      ],
    },
    {
      title: 'Phase 2: Structural Improvements',
      timeline: '6-18 months',
      focus: 'Systematic Enhancement',
      color: 'yellow',
      parameters: structural,
      improvements: [
        'Administrative: Implement comprehensive quality management systems',
        'Academic: Launch centers of excellence in key disciplines',
        'Research: Develop industry-academia collaboration frameworks',
        'Infrastructure: Modernize laboratories and learning spaces',
        'Policy: Establish performance-based incentive structures',
      ],
    },
    {
      title: 'Phase 3: Strategic Positioning',
      timeline: '18+ months',
      focus: 'Excellence & Leadership',
      color: 'green',
      parameters: strategic,
      improvements: [
        'Administrative: Achieve international accreditation standards',
        'Academic: Establish global partnerships and exchange programs',
        'Research: Create innovation hubs and technology transfer offices',
        'Infrastructure: Build world-class research and learning facilities',
        'Policy: Implement strategic planning for sustained excellence',
      ],
    },
  ];
  
  const getColorClasses = (color) => {
    const colors = {
      red: 'border-red-200 bg-red-50',
      yellow: 'border-yellow-200 bg-yellow-50',
      green: 'border-green-200 bg-green-50',
    };
    return colors[color];
  };
  
  const getHeaderColor = (color) => {
    const colors = {
      red: 'bg-red-600',
      yellow: 'bg-yellow-600',
      green: 'bg-green-600',
    };
    return colors[color];
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/analysis')}
        className="flex items-center space-x-2 text-primary hover:text-primary-dark mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Analysis</span>
      </button>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Strategic Improvement Roadmap
        </h1>
        <p className="text-lg text-gray-600">
          {analysisData.universityName}
        </p>
      </div>
      
      <div className="space-y-8">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`border-2 rounded-xl overflow-hidden ${getColorClasses(phase.color)}`}
          >
            <div className={`${getHeaderColor(phase.color)} text-white p-6`}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">{phase.title}</h2>
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{phase.timeline}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span className="text-sm">Focus: {phase.focus}</span>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {phase.parameters.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Priority Parameters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {phase.parameters.map((param) => (
                      <span
                        key={param.id}
                        className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-300"
                      >
                        {param.name} ({param.score})
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Key Improvement Areas
                </h3>
                <ul className="space-y-2">
                  {phase.improvements.map((improvement, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 mr-3 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
              
              {phase.parameters.length > 0 && (
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    Parameter-Specific Actions
                  </h4>
                  <div className="space-y-3">
                    {phase.parameters.slice(0, 2).map((param) => (
                      <div key={param.id}>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {param.name}:
                        </p>
                        <ul className="space-y-1 ml-4">
                          {param.actionSteps.slice(0, 3).map((step, idx) => (
                            <li key={idx} className="text-xs text-gray-600 flex items-start">
                              <span className="mr-2">•</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button
          onClick={() => navigate('/report')}
          className="btn-primary"
        >
          Download Complete Strategic Report
        </button>
      </div>
    </div>
  );
}
