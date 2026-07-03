import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../../common/Button';
import styles from './styles.module.css';

const CTA = ({
  title = 'Ready to Build Your Architectural Vision?',
  description = 'Connect with our structural planning cell to review specifications and draft estimates.',
  bgVariant = 'gradient',
  bgImage,
  layout = 'center',
  primaryBtnText = 'Schedule Consultation',
  primaryBtnLink = '/contact',
  secondaryBtnText = 'View Packages',
  secondaryBtnLink = '/packages',
  className = ''
}) => {
  const panelStyle = bgVariant === 'image' && bgImage 
    ? { backgroundImage: `url(${bgImage})` } 
    : {};

  const panelClasses = [
    styles.panel,
    styles[bgVariant],
    className
  ].filter(Boolean).join(' ');

  const layoutClasses = styles[layout] || styles.center;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={panelClasses} style={panelStyle}>
          {bgVariant === 'image' && <div className={styles.imageOverlay}></div>}
          
          <div className={layoutClasses}>
            {layout === 'split' ? (
              <>
                <div>
                  <h3 className={styles.title}>{title}</h3>
                  <p className={styles.desc} style={{ marginTop: '0.5rem' }}>{description}</p>
                </div>
                
                <div className={styles.buttons} style={{ marginTop: 0 }}>
                  {primaryBtnText && (
                    <Link to={primaryBtnLink}>
                      <Button variant="primary" iconRight={<ArrowRight size={16} />}>
                        {primaryBtnText}
                      </Button>
                    </Link>
                  )}
                  {secondaryBtnText && (
                    <Link to={secondaryBtnLink}>
                      <Button variant="secondary">
                        {secondaryBtnText}
                      </Button>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.desc}>{description}</p>
                
                <div className={styles.buttons}>
                  {primaryBtnText && (
                    <Link to={primaryBtnLink}>
                      <Button variant="primary" iconRight={<ArrowRight size={16} />}>
                        {primaryBtnText}
                      </Button>
                    </Link>
                  )}
                  {secondaryBtnText && (
                    <Link to={secondaryBtnLink}>
                      <Button variant="secondary">
                        {secondaryBtnText}
                      </Button>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
