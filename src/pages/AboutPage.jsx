import { Target, BookOpen, Cpu, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const sections = [
    {
      icon: Target,
      title: 'Our Mission',
      content: `NIRF Compass is designed to empower universities with data-driven insights and strategic 
      recommendations to improve their National Institutional Ranking Framework (NIRF) performance. We leverage 
      artificial intelligence to analyze institutional strengths and weaknesses, providing actionable roadmaps 
      for sustainable improvement.`,
    },
    {
      icon: BookOpen,
      title: 'What is NIRF?',
      content: `The National Institutional Ranking Framework (NIRF) is India's premier ranking system for 
      higher education institutions. Established by the Ministry of Education, NIRF evaluates universities 
      across five key parameters: Teaching, Learning & Resources (TLR), Research & Professional Practice (RP), 
      Graduation Outcomes (GO), Outreach & Inclusivity (OI), and Perception (PR). These parameters provide a 
      comprehensive assessment of institutional excellence.`,
    },
  ];
  
  const howItWorks = [
    {
      step: '01',
      title: 'Data Input',
      description: 'Enter your university name into the system',
    },
    {
      step: '02',
      title: 'AI Analysis',
      description: 'Our AI engine retrieves and analyzes performance data across all NIRF parameters',
    },
    {
      step: '03',
      title: 'Gap Identification',
      description: 'System identifies performance gaps against benchmark standards',
    },
    {
      step: '04',
      title: 'Strategy Generation',
      description: 'AI generates customized improvement recommendations and phased roadmap',
    },
    {
      step: '05',
      title: 'Report Export',
      description: 'Download comprehensive PDF report with SWOT analysis and action plans',
    },
  ];
  
  const techStack = [
    { category: 'Frontend', items: ['React.js 18', 'Vite', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'State Management', items: ['Zustand', 'React Query'] },
    { category: 'Routing', items: ['React Router v6'] },
    { category: 'Forms', items: ['React Hook Form'] },
    { category: 'PDF Generation', items: ['jsPDF'] },
    { category: 'Icons', items: ['Lucide React'] },
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          About NIRF Compass
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Transforming university ranking improvement through intelligent analysis and strategic planning
        </motion.p>
      </div>
      
      {/* Mission & NIRF Sections */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>
      
      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How NIRF Compass Works
        </h2>
        
        <div className="space-y-6">
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 card hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                {item.step}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Technology Stack */}
      <div className="mb-16">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Cpu className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-gray-900">Technology Stack</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-primary mb-3">{tech.category}</h3>
              <ul className="space-y-2">
                {tech.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Academic Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card bg-blue-50 border-2 border-blue-200"
      >
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-blue-900 mb-3">Academic Disclaimer</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                NIRF Compass is a strategic advisory tool developed for academic and research purposes. 
                The system provides data-driven recommendations based on analytical models and should be 
                used as one component of comprehensive institutional planning.
              </p>
              <p>
                While our AI-powered analysis offers valuable insights, actual NIRF rankings depend on 
                official data submission, verification processes, and evaluation by authorized bodies. 
                Users should validate recommendations with institutional data and consult with academic 
                leadership before implementation.
              </p>
              <p className="font-semibold">
                This platform is designed to support, not replace, professional institutional planning 
                and strategic decision-making processes.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
