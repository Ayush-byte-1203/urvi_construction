import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import styles from './WhyChooseUsSection.module.css';
import SectionHeader from '../SectionHeader';
import { useGlobalData } from '../../context/GlobalDataContext';

const defaultFeatures = [
  { icon_name: "Shield", title: "Uncompromising Quality", description: "Premium materials and a 150+ point quality checklist ensure structural integrity and flawless finish." },
  { icon_name: "Clock", title: "On-Time Delivery", description: "Strict project management timelines mean we hand over the keys precisely when promised." },
  { icon_name: "Handshake", title: "100% Transparency", description: "No hidden costs. Detailed BOQs and regular site updates keep you fully informed." },
  { icon_name: "Users", title: "In-House Experts", description: "Architects, engineers, and designers working under one roof for seamless coordination." },
  { icon_name: "Hammer", title: "Skilled Craftsmanship", description: "Our dedicated artisan teams bring years of experience to the finer details of your home." },
  { icon_name: "TrendingUp", title: "Long-Term Warranty", description: "Enjoy peace of mind with our comprehensive 10-year structural warranty on all projects." }
];

const WhyChooseUsSection = () => {
  const { whyChooseUs } = useGlobalData();
  const items = (whyChooseUs && whyChooseUs.length > 0) ? whyChooseUs : defaultFeatures;

  const renderIcon = (iconName) => {
    const IconComp = LucideIcons[iconName] || LucideIcons.ShieldCheck;
    return <IconComp size={28} />;
  };

  return (
    <section className={`section ${styles.whySection}`}>
      <div className="container">
        <SectionHeader 
          eyebrow="The Advantage"
          heading="Why Choose Us"
          subheading="We don't just build structures; we build trust through transparency, precision, and unwavering dedication to excellence."
          center
        />

        <div className={styles.grid}>
          {items.map((feature, idx) => (
            <motion.div 
              key={feature.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}>
                {renderIcon(feature.icon_name)}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
