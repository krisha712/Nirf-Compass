import { motion } from 'framer-motion';
import { Brain, Database, TrendingUp, FileSearch } from 'lucide-react';

export default function LoadingAnalysis() {
  const steps = [
    { icon: Database, text: 'Retrieving university data...' },
    { icon: Brain, text: 'Analyzing NIRF parameters...' },
    { icon: TrendingUp, text: 'Calculating performance metrics...' },
    { icon: FileSearch, text: 'Generating strategic insights...' },
  ];
  
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-8"
      />
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        AI Analyzing University
      </h3>
      <p className="text-gray-500 mb-8">This may take a few moments...</p>
      
      <div className="space-y-4 w-full max-w-md">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3 }}
            className="flex items-center space-x-3 text-gray-600"
          >
            <step.icon className="w-5 h-5 text-primary" />
            <span className="text-sm">{step.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
