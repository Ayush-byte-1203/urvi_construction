import React from 'react';
import { Download, FileText, Sparkles } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import MotionWrapper from '../../common/MotionWrapper';
import styles from './styles.module.css';

const DownloadCenter = () => {
  const documents = [
    {
      title: 'Company Credentials & ISO Certificates',
      desc: 'ISO 9001:2015 and ISO 45001:2018 certifications, safety policies audits, and verified partners profile.',
      size: '2.4 MB'
    },
    {
      title: 'Typical Residential Bill of Quantities (BOQ)',
      desc: 'Standard blank budget estimation spreadsheet structure detailing steel weights, concrete mix rates, and finishing items.',
      size: '1.8 MB'
    },
    {
      title: 'Home Building Staged Guidelines Guide',
      desc: 'A complete handbook explaining geotech soils checks, Revit coordinator drafts, and keys handovers procedures.',
      size: '4.2 MB'
    }
  ];

  return (
    <section className="section container" id="downloads">
      <SectionHeader
        eyebrow="Knowledge Center"
        heading="Resources & Download Center"
        subheading="Access verified guidelines documents, structure sample BOQ sheets, and credentials booklets PDF copies."
      />

      <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2rem' }}>
        {documents.map((doc, idx) => (
          <MotionWrapper
            key={idx}
            variant="slideUp"
            delay={idx * 0.1}
            className={`glass-panel ${styles.docCard}`}
          >
            <FileText size={32} className={styles.fileIcon} />
            <h3 className={styles.docTitle}>{doc.title}</h3>
            <p className={styles.docDesc}>{doc.desc}</p>
            <div className={styles.downloadRow}>
              <span className={styles.docSize}>{doc.size}</span>
              <button 
                onClick={() => alert(`Mock download triggered for: ${doc.title}`)}
                className={`btn btn-secondary ${styles.btnDownload}`}
              >
                Download PDF <Download size={14} style={{ marginLeft: '0.25rem' }} />
              </button>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
};

export default DownloadCenter;
