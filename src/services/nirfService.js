// NIRF Score Generation Service
// Simulates intelligent score retrieval based on university name

const universityDatabase = {
  'IIT Delhi': { tlr: 92, rp: 95, go: 88, oi: 85, pr: 98 },
  'IIT Bombay': { tlr: 94, rp: 96, go: 90, oi: 87, pr: 99 },
  'IIT Madras': { tlr: 91, rp: 94, go: 89, oi: 86, pr: 97 },
  'IISc Bangalore': { tlr: 95, rp: 98, go: 85, oi: 82, pr: 96 },
  'AIIMS Delhi': { tlr: 88, rp: 92, go: 94, oi: 90, pr: 95 },
};

// Generate realistic scores based on university name
const generateScores = (universityName) => {
  // Check if university exists in database
  if (universityDatabase[universityName]) {
    return universityDatabase[universityName];
  }
  
  // Generate realistic scores for unknown universities
  const hash = universityName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash % 100;
  
  return {
    tlr: 55 + (seed % 30) + Math.floor(Math.random() * 10),
    rp: 50 + (seed % 35) + Math.floor(Math.random() * 10),
    go: 60 + (seed % 25) + Math.floor(Math.random() * 10),
    oi: 65 + (seed % 20) + Math.floor(Math.random() * 10),
    pr: 45 + (seed % 40) + Math.floor(Math.random() * 10),
  };
};

// Simulate API call with delay
export const analyzeUniversity = async (universityName) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  const scores = generateScores(universityName);
  const timestamp = new Date().toISOString();
  
  return {
    universityName,
    timestamp,
    scores,
    parameters: [
      {
        id: 'tlr',
        name: 'Teaching, Learning & Resources',
        score: scores.tlr,
        maxScore: 100,
        performanceLevel: getPerformanceLevel(scores.tlr),
        assessment: getAssessment('tlr', scores.tlr),
        benchmarkGap: getBenchmarkGap(scores.tlr),
        riskLevel: getRiskLevel(scores.tlr),
        priority: getPriority(scores.tlr),
        actionSteps: getActionSteps('tlr', scores.tlr),
        expectedOutcome: getExpectedOutcome('tlr', scores.tlr),
      },
      {
        id: 'rp',
        name: 'Research & Professional Practice',
        score: scores.rp,
        maxScore: 100,
        performanceLevel: getPerformanceLevel(scores.rp),
        assessment: getAssessment('rp', scores.rp),
        benchmarkGap: getBenchmarkGap(scores.rp),
        riskLevel: getRiskLevel(scores.rp),
        priority: getPriority(scores.rp),
        actionSteps: getActionSteps('rp', scores.rp),
        expectedOutcome: getExpectedOutcome('rp', scores.rp),
      },
      {
        id: 'go',
        name: 'Graduation Outcomes',
        score: scores.go,
        maxScore: 100,
        performanceLevel: getPerformanceLevel(scores.go),
        assessment: getAssessment('go', scores.go),
        benchmarkGap: getBenchmarkGap(scores.go),
        riskLevel: getRiskLevel(scores.go),
        priority: getPriority(scores.go),
        actionSteps: getActionSteps('go', scores.go),
        expectedOutcome: getExpectedOutcome('go', scores.go),
      },
      {
        id: 'oi',
        name: 'Outreach & Inclusivity',
        score: scores.oi,
        maxScore: 100,
        performanceLevel: getPerformanceLevel(scores.oi),
        assessment: getAssessment('oi', scores.oi),
        benchmarkGap: getBenchmarkGap(scores.oi),
        riskLevel: getRiskLevel(scores.oi),
        priority: getPriority(scores.oi),
        actionSteps: getActionSteps('oi', scores.oi),
        expectedOutcome: getExpectedOutcome('oi', scores.oi),
      },
      {
        id: 'pr',
        name: 'Perception',
        score: scores.pr,
        maxScore: 100,
        performanceLevel: getPerformanceLevel(scores.pr),
        assessment: getAssessment('pr', scores.pr),
        benchmarkGap: getBenchmarkGap(scores.pr),
        riskLevel: getRiskLevel(scores.pr),
        priority: getPriority(scores.pr),
        actionSteps: getActionSteps('pr', scores.pr),
        expectedOutcome: getExpectedOutcome('pr', scores.pr),
      },
    ],
  };
};

const getPerformanceLevel = (score) => {
  if (score >= 80) return 'Strong';
  if (score >= 60) return 'Moderate';
  return 'Low';
};

const getAssessment = (parameter, score) => {
  const assessments = {
    tlr: {
      high: 'Excellent faculty-student ratio, modern infrastructure, and comprehensive learning resources.',
      medium: 'Adequate teaching resources with room for improvement in faculty development and infrastructure.',
      low: 'Significant gaps in teaching quality, infrastructure, and learning resources require immediate attention.',
    },
    rp: {
      high: 'Strong research output with high-quality publications and active industry collaborations.',
      medium: 'Moderate research activity with potential for increased publications and funding.',
      low: 'Limited research output and professional practice engagement need strategic intervention.',
    },
    go: {
      high: 'Outstanding placement records and higher education progression rates.',
      medium: 'Satisfactory graduation outcomes with scope for enhanced placement support.',
      low: 'Graduation outcomes below expectations require comprehensive career development programs.',
    },
    oi: {
      high: 'Exemplary outreach programs and strong inclusivity measures across demographics.',
      medium: 'Good outreach initiatives with opportunities to expand inclusivity efforts.',
      low: 'Outreach and inclusivity programs need substantial development and implementation.',
    },
    pr: {
      high: 'Excellent reputation among peers and employers with strong brand recognition.',
      medium: 'Moderate perception with potential for enhanced visibility and reputation building.',
      low: 'Perception challenges require strategic branding and stakeholder engagement initiatives.',
    },
  };
  
  const level = score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low';
  return assessments[parameter][level];
};

const getBenchmarkGap = (score) => {
  const gap = 90 - score;
  if (gap <= 0) return 'Exceeds top-tier benchmark standards';
  if (gap <= 10) return `${gap} points below top-tier institutions`;
  if (gap <= 20) return `${gap} points gap from leading universities`;
  return `${gap} points below national excellence standards`;
};

const getRiskLevel = (score) => {
  if (score >= 75) return 'Low';
  if (score >= 55) return 'Medium';
  return 'High';
};

const getPriority = (score) => {
  if (score < 55) return 'Critical - Immediate Action Required';
  if (score < 70) return 'High - Address Within 6 Months';
  if (score < 80) return 'Medium - Strategic Improvement';
  return 'Low - Maintain Excellence';
};

const getActionSteps = (parameter, score) => {
  const actions = {
    tlr: [
      'Recruit qualified faculty with PhD credentials',
      'Upgrade laboratory and library infrastructure',
      'Implement modern teaching methodologies and digital tools',
      'Enhance faculty development programs',
      'Improve student support services',
    ],
    rp: [
      'Establish research centers of excellence',
      'Increase funding for research projects',
      'Encourage faculty publications in high-impact journals',
      'Develop industry-academia partnerships',
      'Create innovation and incubation facilities',
    ],
    go: [
      'Strengthen placement cell operations',
      'Develop industry partnerships for internships',
      'Implement career counseling programs',
      'Track alumni career progression',
      'Enhance entrepreneurship support',
    ],
    oi: [
      'Expand scholarship programs for underrepresented groups',
      'Develop community outreach initiatives',
      'Implement accessibility infrastructure',
      'Create mentorship programs',
      'Establish regional extension centers',
    ],
    pr: [
      'Enhance digital presence and branding',
      'Organize national conferences and events',
      'Develop strategic communication campaigns',
      'Strengthen alumni engagement',
      'Build partnerships with reputed institutions',
    ],
  };
  
  return actions[parameter].slice(0, score < 60 ? 5 : 3);
};

const getExpectedOutcome = (parameter, score) => {
  const improvement = score < 60 ? '15-20' : score < 75 ? '10-15' : '5-10';
  return `Expected improvement of ${improvement} points within 12-18 months with consistent implementation`;
};
