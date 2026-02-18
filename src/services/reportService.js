// Report Generation Service
// Generates professional improvement reports

export const generateReport = (analysisData) => {
  const { universityName, timestamp, parameters } = analysisData;
  const date = new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const swotAnalysis = generateSWOT(parameters);
  const roadmap = generateRoadmap(parameters);
  
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
    roadmap,
    swotAnalysis,
    finalRemarks: generateFinalRemarks(parameters),
  };
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
    gap: 90 - param.score,
    gapPercentage: Math.round(((90 - param.score) / 90) * 100),
    analysis: param.benchmarkGap,
  }));
};

const generateRecommendations = (parameters) => {
  return parameters.map(param => ({
    parameter: param.name,
    priority: param.priority,
    riskLevel: param.riskLevel,
    actions: param.actionSteps,
    timeline: param.score < 60 ? '0-6 months' : param.score < 75 ? '6-12 months' : '12-18 months',
    expectedImpact: param.expectedOutcome,
  }));
};

const generateRoadmap = (parameters) => {
  const immediate = parameters.filter(p => p.score < 60);
  const structural = parameters.filter(p => p.score >= 60 && p.score < 75);
  const strategic = parameters.filter(p => p.score >= 75);
  
  return {
    phase1: {
      title: 'Immediate Actions (0-6 months)',
      focus: 'Critical Gap Resolution',
      parameters: immediate.map(p => ({
        name: p.name,
        actions: p.actionSteps,
      })),
    },
    phase2: {
      title: 'Structural Improvements (6-18 months)',
      focus: 'Systematic Enhancement',
      parameters: structural.map(p => ({
        name: p.name,
        actions: p.actionSteps,
      })),
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

const generateSWOT = (parameters) => {
  const strong = parameters.filter(p => p.score >= 75);
  const weak = parameters.filter(p => p.score < 60);
  
  return {
    strengths: [
      ...strong.map(p => `Strong performance in ${p.name} (${p.score}/100)`),
      'Established institutional framework',
      'Committed faculty and staff',
    ],
    weaknesses: [
      ...weak.map(p => `Below-benchmark performance in ${p.name} (${p.score}/100)`),
      'Resource allocation inefficiencies',
      'Limited stakeholder engagement',
    ],
    opportunities: [
      'Government funding initiatives for higher education',
      'Industry collaboration potential',
      'Digital transformation in education',
      'Growing demand for quality education',
      'International partnership possibilities',
    ],
    threats: [
      'Increasing competition from peer institutions',
      'Changing regulatory landscape',
      'Faculty retention challenges',
      'Rapid technological changes',
      'Economic uncertainties affecting funding',
    ],
  };
};

const generateFinalRemarks = (parameters) => {
  const avgScore = parameters.reduce((sum, p) => sum + p.score, 0) / parameters.length;
  
  if (avgScore >= 80) {
    return 'The institution demonstrates strong performance across NIRF parameters. Focus should be on maintaining excellence and pursuing leadership in emerging areas. Strategic investments in innovation and global partnerships will further strengthen the institutional position.';
  } else if (avgScore >= 65) {
    return 'The institution shows solid foundation with clear improvement pathways. Systematic implementation of recommended actions will significantly enhance NIRF ranking. Priority should be given to addressing identified gaps while leveraging existing strengths.';
  } else {
    return 'The institution requires comprehensive strategic intervention across multiple parameters. Immediate action on critical areas, combined with long-term structural improvements, will establish a strong trajectory toward excellence. Leadership commitment and resource mobilization are essential for successful transformation.';
  }
};

// Export report as downloadable content
export const exportReport = (report) => {
  const content = formatReportContent(report);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `NIRF_Strategic_Report_${report.coverPage.subtitle.replace(/\s+/g, '_')}_${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const formatReportContent = (report) => {
  return `
═══════════════════════════════════════════════════════════════
                    STRATEGIC IMPROVEMENT REPORT
                    NIRF COMPASS AI ANALYSIS SYSTEM
═══════════════════════════════════════════════════════════════

Institution: ${report.coverPage.subtitle}
Analysis Date: ${report.coverPage.date}
Prepared By: ${report.coverPage.preparedBy}

═══════════════════════════════════════════════════════════════
                        EXECUTIVE SUMMARY
═══════════════════════════════════════════════════════════════

Overall Performance: ${report.executiveSummary.overallPerformance}
Average Score: ${report.executiveSummary.averageScore}/100

Strong Areas:
${report.executiveSummary.strongAreas.map(a => `  • ${a}`).join('\n') || '  • None identified'}

Critical Areas:
${report.executiveSummary.criticalAreas.map(a => `  • ${a}`).join('\n') || '  • None identified'}

Key Insight:
${report.executiveSummary.keyInsight}

═══════════════════════════════════════════════════════════════
                    AUTO-GENERATED NIRF SCORES
═══════════════════════════════════════════════════════════════

${report.scores.map(s => `
${s.name}
  Score: ${s.score}/100
  Performance Level: ${s.performanceLevel}
  Assessment: ${s.assessment}
`).join('\n')}

═══════════════════════════════════════════════════════════════
                    PARAMETER-WISE GAP ANALYSIS
═══════════════════════════════════════════════════════════════

${report.gapAnalysis.map(g => `
${g.parameter}
  Current Score: ${g.currentScore}/100
  Benchmark: ${g.benchmarkScore}/100
  Gap: ${g.gap} points (${g.gapPercentage}%)
  Analysis: ${g.analysis}
`).join('\n')}

═══════════════════════════════════════════════════════════════
                    DETAILED RECOMMENDATIONS
═══════════════════════════════════════════════════════════════

${report.recommendations.map(r => `
${r.parameter}
  Priority: ${r.priority}
  Risk Level: ${r.riskLevel}
  Timeline: ${r.timeline}
  
  Action Steps:
${r.actions.map(a => `    • ${a}`).join('\n')}
  
  Expected Impact: ${r.expectedImpact}
`).join('\n')}

═══════════════════════════════════════════════════════════════
                    STRATEGIC ROADMAP
═══════════════════════════════════════════════════════════════

PHASE 1: ${report.roadmap.phase1.title}
Focus: ${report.roadmap.phase1.focus}
${report.roadmap.phase1.parameters.map(p => `
  ${p.name}:
${p.actions.map(a => `    • ${a}`).join('\n')}`).join('\n')}

PHASE 2: ${report.roadmap.phase2.title}
Focus: ${report.roadmap.phase2.focus}
${report.roadmap.phase2.parameters.map(p => `
  ${p.name}:
${p.actions.map(a => `    • ${a}`).join('\n')}`).join('\n')}

PHASE 3: ${report.roadmap.phase3.title}
Focus: ${report.roadmap.phase3.focus}
${report.roadmap.phase3.parameters.map(p => `
  ${p.name}:
${p.actions.map(a => `    • ${a}`).join('\n')}`).join('\n')}

═══════════════════════════════════════════════════════════════
                        SWOT ANALYSIS
═══════════════════════════════════════════════════════════════

STRENGTHS:
${report.swotAnalysis.strengths.map(s => `  • ${s}`).join('\n')}

WEAKNESSES:
${report.swotAnalysis.weaknesses.map(w => `  • ${w}`).join('\n')}

OPPORTUNITIES:
${report.swotAnalysis.opportunities.map(o => `  • ${o}`).join('\n')}

THREATS:
${report.swotAnalysis.threats.map(t => `  • ${t}`).join('\n')}

═══════════════════════════════════════════════════════════════
                        FINAL REMARKS
═══════════════════════════════════════════════════════════════

${report.finalRemarks}

═══════════════════════════════════════════════════════════════
                    END OF REPORT
═══════════════════════════════════════════════════════════════
`;
};
