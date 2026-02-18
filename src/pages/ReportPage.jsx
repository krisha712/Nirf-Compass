import { useNavigate } from 'react-router-dom';
import { useAnalysisStore } from '@/store/analysisStore';
import { generateReport } from '@/services/reportService';
import { generatePDFReport } from '@/services/pdfService';
import { ArrowLeft, Download, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReportPage() {
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
  
  const report = generateReport(analysisData);
  
  const handleDownload = () => {
    generatePDFReport(report);
    toast.success('PDF report downloaded successfully!');
  };
  
  const reportSections = [
    { icon: FileText, title: 'Cover Page', desc: 'Professional title and institution details' },
    { icon: CheckCircle, title: 'Executive Summary', desc: 'Overall performance and key insights' },
    { icon: CheckCircle, title: 'Auto-Generated NIRF Scores', desc: 'Complete parameter-wise scores and assessments' },
    { icon: CheckCircle, title: 'Parameter-Wise Gap Analysis', desc: 'Detailed benchmark comparison' },
    { icon: CheckCircle, title: 'Detailed Recommendations', desc: 'Strategic action steps with timelines' },
    { icon: CheckCircle, title: 'Strategic Roadmap', desc: 'Phased implementation plan' },
    { icon: CheckCircle, title: 'Final Consultant Remarks', desc: 'Professional assessment and guidance' },
  ];
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/analysis')}
        className="flex items-center space-x-2 text-primary hover:text-primary-dark mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Analysis</span>
      </button>
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Strategic Improvement Report
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          {report.coverPage.subtitle}
        </p>
        <p className="text-sm text-gray-500">
          Prepared on {report.coverPage.date}
        </p>
      </div>
      
      {/* Report Preview */}
      <div className="card mb-8">
        <div className="flex items-start space-x-4 mb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Report Contents
            </h2>
            <p className="text-gray-600">
              Comprehensive strategic analysis and improvement recommendations
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {reportSections.map((section, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
            >
              <section.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {section.title}
                </h3>
                <p className="text-xs text-gray-600">{section.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Executive Summary Preview */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Executive Summary Preview
        </h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Overall Performance</p>
              <p className="text-2xl font-bold text-primary">
                {report.executiveSummary.overallPerformance}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Average Score</p>
              <p className="text-2xl font-bold text-primary">
                {report.executiveSummary.averageScore}/100
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Key Insight</p>
            <p className="text-sm text-gray-600">{report.executiveSummary.keyInsight}</p>
          </div>
          
          {report.executiveSummary.strongAreas.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Strong Areas</p>
              <div className="flex flex-wrap gap-2">
                {report.executiveSummary.strongAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {report.executiveSummary.criticalAreas.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Critical Areas</p>
              <div className="flex flex-wrap gap-2">
                {report.executiveSummary.criticalAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={handleDownload}
          className="btn-primary inline-flex items-center space-x-2 text-lg"
        >
          <Download className="w-5 h-5" />
          <span>Download Strategic Improvement Report (PDF)</span>
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Professional PDF report with complete analysis and recommendations
        </p>
      </div>
    </div>
  );
}
