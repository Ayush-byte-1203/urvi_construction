import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Handshake, Users, Hammer, TrendingUp } from 'lucide-react';
import styles from './WhyChooseUsSection.module.css';
import SectionHeader from '../SectionHeader';

// TODO: replace placeholder content
const features = [
  {
    icon: <Shield size={28} />,
    title: "Uncompromising Quality",
    description: "Premium materials and a 150+ point quality checklist ensure structural integrity and flawless finish."
  },
  {
    icon: <Clock size={28} />,
    title: "On-Time Delivery",
    description: "Strict project management timelines mean we hand over the keys precisely when promised."
  },
  {
    icon: <Handshake size={28} />,
    title: "100% Transparency",
    description: "No hidden costs. Detailed BOQs and regular site updates keep you fully informed."
  },
  {
    icon: <Users size={28} />,
    title: "In-House Experts",
    description: "Architects, engineers, and designers working under one roof for seamless coordination."
  },
  {
    icon: <Hammer size={28} />,
    title: "Skilled Craftsmanship",
    description: "Our dedicated artisan teams bring years of experience to the finer details of your home."
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Long-Term Warranty",
    description: "Enjoy peace of mind with our comprehensive 10-year structural warranty on all projects."
  }
];

const WhyChooseUsSection = () => {
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
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}>
                {feature.icon}
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
