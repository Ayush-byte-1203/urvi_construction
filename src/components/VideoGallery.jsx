// import React from 'react';
// import { Play, Sparkles } from 'lucide-react';
// import SectionHeader from './SectionHeader';
// import MotionWrapper from './MotionWrapper';
// import styles from './VideoGallery.module.css';

// // const VideoGallery = () => {
// //   const videos = [
// //     {
// //       title: 'Obsidian Horizon Villa Staging Walkthrough',
// //       category: 'Project Walkthrough',
// //       image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
// //       duration: '4:12 Min'
// //     },
// //     {
// //       title: '120-Day Civil Concrete Casting Timelapse',
// //       category: 'Construction Timelapse',
// //       image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
// //       duration: '2:30 Min'
// //     },
// //     {
// //       title: 'Vista Residences Aerial Drone Inspections',
// //       category: 'Drone Site View',
// //       image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
// //       duration: '1:45 Min'
// //     },
// //     {
// //       title: 'Dr. Ananya Sen Owner Handover Review',
// //       category: 'Customer Story',
// //       image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
// //       duration: '3:15 Min'
// //     }
// //   ];

// //   return (
// //     <section className="section container" id="videos">
// //       <SectionHeader
// //         eyebrow="Media Hub"
// //         heading="Video Gallery & Site Staging"
// //         subheading="Watch live recordings of concrete casting structural works, lab compression tests, and finished landmark handovers."
// //       />

// //       <div className="grid-2" style={{ marginTop: '3.5rem', gap: '2rem' }}>
// //         {videos.map((vid, idx) => (
// //           <MotionWrapper
// //             key={idx}
// //             variant="slideUp"
// //             delay={idx * 0.1}
// //             className={`glass-panel ${styles.videoCard}`}
// //           >
// //             <div className={styles.thumbnailWrapper}>
// //               <img src={vid.image} alt={vid.title} className={styles.thumbnail} />
// //               <div className={styles.playOverlay}>
// //                 <div className={styles.playBtn} onClick={() => alert(`Launching: ${vid.title} (Simulator overlay)`)}>
// //                   <Play size={20} fill="currentColor" />
// //                 </div>
// //               </div>
// //               <span className={styles.categoryBadge}>{vid.category}</span>
// //               <span className={styles.duration}>{vid.duration}</span>
// //             </div>
// //             <h4 className={styles.videoTitle}>{vid.title}</h4>
// //           </MotionWrapper>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// export default VideoGallery;
