import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, HardHat, Sparkles, FileCheck, FileText, Package, Cpu, ShieldAlert, Shield, Leaf, ArrowRight
} from 'lucide-react';
import SectionHeader from '../SectionHeader';
import MotionWrapper from '../../common/MotionWrapper';
import styles from './styles.module.css';

const OneStopHomeSolutions = () => {
  const [hoveredIdx, setHoveredIdx] = useState(0);

  const services = [
    {
      icon: <Compass size={22} />,
      title: 'Architecture',
      desc: 'BIM-coordinated 3D coordinate drafting cell creating luxury layouts with millimetric precision.',
      image: 'https://images.unsplash.com/photo-1503387762-592ded58c45a?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <HardHat size={22} />,
      title: 'Construction',
      desc: 'Certified general contracting teams pouring EAF steel and anti-curing concrete foundations.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <Sparkles size={22} />,
      title: 'Interior Design',
      desc: 'Custom interior fit-outs, vitrified floor maps, and champagne bronze layout coordinates.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <FileCheck size={22} />,
      title: 'PMC',
      desc: 'Project Management Consultancy providing site schedules verification and BOQ audit updates.',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <FileText size={22} />,
      title: 'Plan Approval',
      desc: 'Handling soil geotech evaluations clearances and local municipality permissions files processing.',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <Package size={22} />,
      title: 'Material Supply',
      desc: 'Direct supplier yards network providing high-grade cement and Fe 550D rebar steel.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <Cpu size={22} />,
      title: 'Smart Home',
      desc: 'Low-voltage home automations, ambient light routing, and CCTV sensory security grids.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <Sparkles size={22} />,
      title: 'Renovation',
      desc: 'High-end remodeling mapping custom villa extensions and structural reinforcement updates.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <Shield size={22} />,
      title: 'Legal Assistance',
      desc: 'Clearing zoning bounds disputes and drafting clear escrow milestone agreements.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    },
    {
      icon: <Leaf size={22} />,
      title: 'Landscape',
      desc: 'Eco-conscious green landscape layouts featuring carbon-absorbing concrete borders.',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80',
      path: '/services'
    }
  ];

  const activeService = services[hoveredIdx];

  return (
    <section className={`section ${styles.section}`} id="solutions">
      <div className="container">
        <SectionHeader
          eyebrow="One Stop Solutions"
          heading="End-to-End Home Solutions"
          subheading="A unified framework mapping structural safety, premium supply chain logistics, smart upgrades, and legal approvals."
        />

        <div className={styles.interactiveGrid} style={{ marginTop: '4rem' }}>
          {/* Left Column: Interactive Circle Nodes */}
          <div className={styles.nodesWrapper}>
            {services.map((item, idx) => (
              <div
                key={idx}
                className={`${styles.nodeItem} ${idx === hoveredIdx ? styles.nodeActive : ''}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={() => setHoveredIdx(idx)}
              >
                <div className={styles.nodeIconCircle}>{item.icon}</div>
                <span className={styles.nodeTitle}>{item.title}</span>
              </div>
            ))}
          </div>

          {/* Right Column: Central Preview Display (High-contrast glass card) */}
          <div className={`glass-panel ${styles.previewCard}`}>
            <div className={styles.imageBackgroundWrapper}>
              <img 
                src={activeService.image} 
                alt={activeService.title} 
                className={styles.bgImage} 
              />
              <div className={styles.overlayColor} />
            </div>

            <div className={styles.cardContent}>
              <span className={styles.highlightTag}>Ecosystem Service</span>
              <h3 className={styles.previewTitle}>{activeService.title}</h3>
              <p className={styles.previewDesc}>{activeService.desc}</p>
              
              <Link to={activeService.path} className={styles.previewCta}>
                Explore Specialty Scope <ArrowRight size={16} style={{ marginLeft: '4px' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneStopHomeSolutions;
