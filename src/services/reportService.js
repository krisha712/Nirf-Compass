// Report Generation Service – works with backend-mapped analysisData

export const generateReport = (analysisData) => {
  const { universityName, timestamp, parameters } = analysisData;
  const date = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return {
    coverPage: {
      title: 'Strategic Improvement Report',
      subtitle: universityName,
      date,
      preparedBy: 'NIRF Compass AI Analysis System',
    },
    executiveSummary: generateExecutiveSummary(parameters),
    scores: parameters,
    gapAnalysis: generateGapAnalysis(parameters),
    recommendations: generateRecommendations(parameters),
    roadmap: generateRoadmap(parameters),
    finalRemarks: generateFinalRemarks(parameters),
  };
};

const getPerformanceLevel = (score) =>
  score >= 80 ? 'Strong' : score >= 60 ? 'Moderate' : 'Needs Improvement';

const getAssessment = (param) => {
  if (param.gap > 0) return `Gap of ${param.gap} points vs peer average of ${param.score + param.gap}.`;
  return `Performing at or above peer average.`;
};

const generateExecutiveSummary = (parameters) => {
  const avgScore = parameters.reduce((sum, p) => sum + p.score, 0) / parameters.length;
  const criticalAreas = parameters.filter(p => p.score < 60);
  const strongAreas = parameters.filter(p => p.score >= 80);

  return {
    overallPerformance: avgScore >= 75 ? 'Strong' : avgScore >= 60 ? 'Moderate' : 'Needs Improvement',
    averageScore: Math.round(avgScore),
    criticalAreas: criticalAreas.map(p => p.name),
    strongAreas: strongAreas.map(p => p.name),
    keyInsight: `The institution demonstrates ${strongAreas.length > 0 ? 'notable strengths' : 'significant potential'} with ${criticalAreas.length} area${criticalAreas.length !== 1 ? 's' : ''} requiring immediate strategic intervention.`,
  };
};

const generateGapAnalysis = (parameters) => {
  return parameters.map(param => ({
    parameter: param.name,
    currentScore: param.score,
    benchmarkScore: 90,
    gap: Math.round(90 - param.score),
    gapPercentage: Math.round(((90 - param.score) / 90) * 100),
    analysis: getAssessment(param),
  }));
};

const generateRecommendations = (parameters) => {
  return parameters.map(param => ({
    parameter: param.name,
    priority: param.score < 60 ? 'High' : param.score < 75 ? 'Medium' : 'Low',
    riskLevel: param.score < 60 ? 'Critical' : param.score < 75 ? 'Moderate' : 'Low',
    actions: param.recommendations && param.recommendations.length > 0
      ? param.recommendations
      : ['Review current practices', 'Benchmark against top institutions', 'Develop targeted improvement plan'],
    timeline: param.score < 60 ? '0-6 months' : param.score < 75 ? '6-12 months' : '12-18 months',
    expectedImpact: `Improve ${param.name} score by 5-10 points within the timeline.`,
  }));
};

const generateRoadmap = (parameters) => {
  const immediate   = parameters.filter(p => p.score < 60);
  const structural  = parameters.filter(p => p.score >= 60 && p.score < 75);
  const strategic   = parameters.filter(p => p.score >= 75);

  const toPhaseParam = (p) => ({
    name: p.name,
    actions: p.recommendations && p.recommendations.length > 0
      ? p.recommendations
      : ['Develop improvement plan', 'Allocate resources', 'Monitor progress'],
  });

  return {
    phase1: {
      title: 'Immediate Actions (0-6 months)',
      focus: 'Critical Gap Resolution',
      parameters: immediate.map(toPhaseParam),
    },
    phase2: {
      title: 'Structural Improvements (6-18 months)',
      focus: 'Systematic Enhancement',
      parameters: structural.map(toPhaseParam),
    },
    phase3: {
      title: 'Strategic Positioning (18+ months)',
      focus: 'Excellence & Leadership',
      parameters: strategic.map(p => ({
        name: p.name,
        actions: ['Maintain excellence standards', 'Benchmark against global institutions', 'Lead innovation initiatives'],
      })),
    },
  };
};

const generateFinalRemarks = (parameters) => {
  const avgScore = parameters.reduce((sum, p) => sum + p.score, 0) / parameters.length;

  if (avgScore >= 80) {
    return 'The institution demonstrates strong performance across NIRF parameters. Focus should be on maintaining excellence and pursuing leadership in emerging areas.';
  } else if (avgScore >= 65) {
    return 'The institution shows a solid foundation with clear improvement pathways. Systematic implementation of recommended actions will significantly enhance NIRF ranking.';
  } else {
    return 'The institution requires comprehensive strategic intervention across multiple parameters. Immediate action on critical areas, combined with long-term structural improvements, will establish a strong trajectory toward excellence.';
  }
};
