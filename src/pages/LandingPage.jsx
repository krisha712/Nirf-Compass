import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Analysis',
      description: 'Automated score generation and intelligent assessment',
    },
    {
      icon: Target,
      title: 'Strategic Insights',
      description: 'Data-driven recommendations for ranking improvement',
    },
    {
      icon: FileText,
      title: 'Professional Reports',
      description: 'Comprehensive improvement strategy documentation',
    },
  ];
  
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-accent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              NIRF Compass
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              AI-Powered University Ranking Improvement System
            </p>
            <p className="text-lg text-blue-200 mb-10 max-w-3xl mx-auto">
              Enter your university name and let our AI analyze performance across all NIRF parameters, 
              identify gaps, and generate a comprehensive strategic improvement plan.
            </p>
            <button
              onClick={() => navigate('/analysis')}
              className="btn-primary inline-flex items-center space-x-2 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <span>Start Analysis</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Enter University', desc: 'Provide university name' },
              { step: '02', title: 'AI Analysis', desc: 'System retrieves and analyzes data' },
              { step: '03', title: 'View Insights', desc: 'Review scores and recommendations' },
              { step: '04', title: 'Download Report', desc: 'Get professional strategy document' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
