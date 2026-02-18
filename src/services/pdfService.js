import jsPDF from 'jspdf';

export const generatePDFReport = (report) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;
  
  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };
  
  // Helper function to add text with word wrap
  const addText = (text, fontSize = 10, isBold = false, color = [0, 0, 0]) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(...color);
    
    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach((line) => {
      checkPageBreak();
      doc.text(line, margin, yPosition);
      yPosition += fontSize * 0.5;
    });
    yPosition += 5;
  };
  
  // Helper function to add section divider
  const addDivider = () => {
    checkPageBreak();
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
  };
  
  // ===== COVER PAGE =====
  doc.setFillColor(30, 58, 138); // Primary color
  doc.rect(0, 0, pageWidth, 80, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('STRATEGIC IMPROVEMENT REPORT', pageWidth / 2, 35, { align: 'center' });
  
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('NIRF Compass AI Analysis System', pageWidth / 2, 50, { align: 'center' });
  
  yPosition = 100;
  doc.setTextColor(0, 0, 0);
  
  addText(`Institution: ${report.coverPage.subtitle}`, 16, true, [30, 58, 138]);
  addText(`Analysis Date: ${report.coverPage.date}`, 12);
  addText(`Prepared By: ${report.coverPage.preparedBy}`, 12);
  
  yPosition = pageHeight - 40;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Confidential - For Strategic Planning Use Only', pageWidth / 2, yPosition, { align: 'center' });
  
  // ===== EXECUTIVE SUMMARY =====
  doc.addPage();
  yPosition = margin;
  
  addText('EXECUTIVE SUMMARY', 18, true, [30, 58, 138]);
  addDivider();
  
  addText('Overall Performance', 12, true);
  addText(`${report.executiveSummary.overallPerformance} (Average Score: ${report.executiveSummary.averageScore}/100)`, 11);
  
  addText('Key Insight', 12, true);
  addText(report.executiveSummary.keyInsight, 10);
  
  if (report.executiveSummary.strongAreas.length > 0) {
    addText('Strong Areas', 12, true);
    report.executiveSummary.strongAreas.forEach((area) => {
      addText(`• ${area}`, 10);
    });
  }
  
  if (report.executiveSummary.criticalAreas.length > 0) {
    addText('Critical Areas Requiring Attention', 12, true);
    report.executiveSummary.criticalAreas.forEach((area) => {
      addText(`• ${area}`, 10);
    });
  }
  
  // ===== AUTO-GENERATED NIRF SCORES =====
  doc.addPage();
  yPosition = margin;
  
  addText('AUTO-GENERATED NIRF SCORES', 18, true, [30, 58, 138]);
  addDivider();
  
  report.scores.forEach((param) => {
    checkPageBreak(40);
    
    addText(param.name, 12, true);
    addText(`Score: ${param.score}/100 | Performance Level: ${param.performanceLevel}`, 10);
    addText(`Assessment: ${param.assessment}`, 10);
    yPosition += 5;
  });
  
  // ===== GAP ANALYSIS =====
  doc.addPage();
  yPosition = margin;
  
  addText('PARAMETER-WISE GAP ANALYSIS', 18, true, [30, 58, 138]);
  addDivider();
  
  report.gapAnalysis.forEach((gap) => {
    checkPageBreak(35);
    
    addText(gap.parameter, 12, true);
    addText(`Current Score: ${gap.currentScore}/100 | Benchmark: ${gap.benchmarkScore}/100`, 10);
    addText(`Gap: ${gap.gap} points (${gap.gapPercentage}%)`, 10);
    addText(`Analysis: ${gap.analysis}`, 10);
    yPosition += 5;
  });
  
  // ===== RECOMMENDATIONS =====
  doc.addPage();
  yPosition = margin;
  
  addText('DETAILED RECOMMENDATIONS', 18, true, [30, 58, 138]);
  addDivider();
  
  report.recommendations.forEach((rec) => {
    checkPageBreak(50);
    
    addText(rec.parameter, 12, true);
    addText(`Priority: ${rec.priority} | Risk Level: ${rec.riskLevel}`, 10);
    addText(`Timeline: ${rec.timeline}`, 10);
    addText('Action Steps:', 10, true);
    rec.actions.forEach((action) => {
      addText(`  • ${action}`, 9);
    });
    addText(`Expected Impact: ${rec.expectedImpact}`, 9);
    yPosition += 5;
  });
  
  // ===== STRATEGIC ROADMAP =====
  doc.addPage();
  yPosition = margin;
  
  addText('STRATEGIC ROADMAP', 18, true, [30, 58, 138]);
  addDivider();
  
  const phases = [report.roadmap.phase1, report.roadmap.phase2, report.roadmap.phase3];
  
  phases.forEach((phase) => {
    checkPageBreak(40);
    
    addText(phase.title, 14, true, [30, 58, 138]);
    addText(`Focus: ${phase.focus}`, 11);
    
    phase.parameters.forEach((param) => {
      checkPageBreak(30);
      addText(param.name, 11, true);
      param.actions.forEach((action) => {
        addText(`  • ${action}`, 9);
      });
    });
    yPosition += 5;
  });
  
  // ===== FINAL REMARKS =====
  doc.addPage();
  yPosition = margin;
  
  addText('FINAL CONSULTANT REMARKS', 18, true, [30, 58, 138]);
  addDivider();
  
  addText(report.finalRemarks, 11);
  
  yPosition = pageHeight - 50;
  addDivider();
  addText(`Generated: ${new Date().toLocaleString()}`, 9, false, [100, 100, 100]);
  addText('NIRF Compass - AI-Powered Strategic Analysis System', 9, false, [100, 100, 100]);
  
  // Save PDF
  const fileName = `NIRF_Strategic_Report_${report.coverPage.subtitle.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
  doc.save(fileName);
};
