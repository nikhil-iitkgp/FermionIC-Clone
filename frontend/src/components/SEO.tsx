import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

const SEO = ({
  title = "SiktaSys - Advanced Semiconductor Solutions",
  description = "SiktaSys is a fabless semiconductor company developing cutting-edge IPs and chipsets for Edge Computing, Wireless and Wireline Communication SoCs, Power Management Units, and Sensor Data Acquisition SoCs.",
  keywords = "semiconductor, silicon IP, edge computing, AI accelerator, power management, SERDES, data converters, analog frontend, wireless communication, IoT, fabless semiconductor",
  image = "/images/siktasys-og-image.jpg",
  url = "https://siktasys.com",
  type = "website",
  author = "SiktaSys"
}: SEOProps) => {
  const fullTitle = title.includes("SiktaSys") ? title : `${title} | SiktaSys`;
  
  useEffect(() => {
    // Update document title
    document.title = fullTitle;
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    
    // Open Graph meta tags
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:site_name', 'SiktaSys', true);
    
    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Add structured data
    const addStructuredData = () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SiktaSys",
        "description": description,
        "url": url,
        "logo": `${url}/images/siktasys-logo.png`,
        "foundingDate": "2020",
        "industry": "Semiconductor Manufacturing",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "3A Block-20, New Joth Shibrampur Road, Thakurpukur Mahestola",
          "addressLocality": "Kolkata",
          "addressRegion": "West Bengal",
          "postalCode": "700141",
          "addressCountry": "IN"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service",
          "email": "info@siktasys.com"
        }
      });
      document.head.appendChild(script);
    };
    
    addStructuredData();
  }, [fullTitle, description, keywords, image, url, type, author]);
  
  return null; // This component doesn't render anything visible
};

export default SEO;
