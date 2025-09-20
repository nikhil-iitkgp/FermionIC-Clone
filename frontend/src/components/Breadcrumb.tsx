import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const location = useLocation();
  
  // Auto-generate breadcrumb items if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable label
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Special cases for better labels
      if (segment === 'silicon-ip') label = 'Silicon IP';
      if (segment === 'about-us') label = 'About Us';
      if (segment === 'contact-us') label = 'Contact Us';
      if (segment === 'ai-accelerator-chip') label = 'AI Accelerator Chip';
      if (segment === 'power-management-ics') label = 'Power Management ICs';
      if (segment === 'wireline-communication-ics') label = 'Wireline Communication ICs';
      if (segment === 'communication-socs') label = 'Communication SoCs';
      if (segment === 'analog-frontend') label = 'Analog Frontend';
      if (segment === 'data-converters') label = 'Data Converters';
      
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/' || location.pathname === '/home') {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-b border-gray-700/50 py-3 px-6 sm:px-12 lg:px-24 mt-4"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={item.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight 
                    className="text-gray-500 mx-2 flex-shrink-0" 
                    size={16} 
                  />
                )}
                
                {isLast ? (
                  <span className="text-cyan-400 font-medium flex items-center">
                    {index === 0 && <Home className="mr-1" size={16} />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                  >
                    {index === 0 && <Home className="mr-1 group-hover:text-cyan-400" size={16} />}
                    <span className="hover:underline">{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </motion.nav>
  );
};

export default Breadcrumb;
