import React from 'react';
import { ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import MotionWrapper from '../../common/MotionWrapper';
import styles from './styles.module.css';

const MaterialBrandsExplorer = () => {
  const brands = [
    {
      name: 'UltraTech Cement',
      badge: 'Certified Grade-53',
      why: 'High compression durability and optimal curing cycles.',
      use: 'Foundations pouring and RCC load pillars.'
    },
    {
      name: 'Tata Tiscon Steel',
      badge: 'Fe 550D High Ductility',
      why: 'Anti-corrosive Thermo-Mechanically Treated EAF steel.',
      use: 'Concrete columns, footings rebar framing.'
    },
    {
      name: 'Asian Paints',
      badge: 'Apex Ultima Shield',
      why: 'Weather-proof protection, low VOC paint systems.',
      use: 'Exterior wall double coat layouts coatings.'
    },
    {
      name: 'Kajaria Tiles',
      badge: 'Vitrified Luxury',
      why: 'Scratch-resistant polished marble finishes coordinates.',
      use: 'Living area floor layouts and bathroom tiling.'
    },
    {
      name: 'Jaquar Fittings',
      badge: 'Premium MEP mix',
      why: 'Precision ceramic cartridges and chrome durability.',
      use: 'Kitchen counters slab and toilet water systems.'
    },
    {
      name: 'Anchor Electrical',
      badge: 'Flame Retardant PVC',
      why: 'Low-voltage modular grids and overload protection wires.',
      use: 'Concealed copper PVC conduits routing.'
    }
  ];

  return (
    <section className={`section ${styles.brandsSection}`} id="brands">
      <div className="container">
        <SectionHeader
          eyebrow="Supply Chain"
          heading="Premium Material Partners"
          subheading="We procure only certified raw materials from verified vendors, ensuring structural endurance."
        />

        <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2rem' }}>
          {brands.map((brand, idx) => (
            <MotionWrapper
              key={idx}
              variant="slideUp"
              delay={idx * 0.08}
              className={`glass-panel ${styles.brandCard}`}
            >
              {/* Front Side: brand name and badge */}
              <div className={styles.frontSide}>
                <div className={styles.badgeRow}>
                  <ShieldCheck size={16} className={styles.icon} />
                  <span className={styles.badge}>{brand.badge}</span>
                </div>
                <h4 className={styles.brandName}>{brand.name}</h4>
                <span className={styles.hoverPrompt}>Hover to Reveal Specs</span>
              </div>

              {/* Hover Overlay Detail */}
              <div className={styles.overlayDetail}>
                <span className={styles.overlayTag}>Quality Standard</span>
                <h5 className={styles.overlayTitle}>{brand.name}</h5>
                <div className={styles.detailItem}>
                  <strong>Why We Use:</strong>
                  <p>{brand.why}</p>
                </div>
                <div className={styles.detailItem}>
                  <strong>Where Applied:</strong>
                  <p>{brand.use}</p>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialBrandsExplorer;
