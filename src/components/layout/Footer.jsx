import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'About Platform',
      content: (
        <p className="text-sm text-gray-600 leading-relaxed">
          NIRF Compass is an AI-powered strategic decision-support system designed to help 
          universities improve their NIRF ranking performance through structured analysis 
          and actionable recommendations.
        </p>
      ),
    },
    {
      title: 'Policy',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Use', href: '/terms' },
        { name: 'Data Usage Policy', href: '/data-policy' },
        { name: 'AI Transparency Statement', href: '/ai-transparency' },
      ],
    },
    {
      title: 'Publisher Information',
      content: (
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-semibold text-gray-700">CSPIT AIML Department</p>
          <p>Charotar University of Science and Technology</p>
          <p>Academic Research Project</p>
          <p className="text-gray-500">{currentYear}</p>
        </div>
      ),
    },
    {
      title: 'Created By',
      content: (
        <div className="text-sm text-gray-600 space-y-1">
          <p className="font-semibold text-gray-700">Krisha Shah</p>
          <p>24AIML061</p>
          <p>AIML, CSPIT</p>
          <p>Charusat University</p>
        </div>
      ),
    },
  ];
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              {section.content ? (
                section.content
              ) : (
                <ul className="space-y-2">
                  {section.links?.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-600 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-300 mb-6"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <div className="bg-primary rounded p-1.5">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">NIRF Compass</span>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} NIRF Compass. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Academic Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
