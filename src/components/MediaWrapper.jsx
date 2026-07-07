import React, { useState, useEffect } from 'react';
import { ImageOff } from 'lucide-react';
import Skeleton from '@components/Skeleton';
import styles from './MediaWrapper.module.css';

const MediaWrapper = ({
  src,
  type = 'image',
  alt = 'Media content',
  aspectRatio = '16/10',
  className = '',
  poster = '',
  autoPlay = false,
  muted = false,
  loop = false,
  style = {},
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset states on src change
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div 
      className={`${styles.wrapper} ${className}`}
      style={{ aspectRatio, ...style }}
      {...props}
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className={styles.skeletonOverlay}>
          <Skeleton width="100%" height="100%" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className={styles.errorOverlay}>
          <ImageOff size={24} />
          <span>Failed to load asset</span>
        </div>
      )}

      {/* Actual Media Tag */}
      {!hasError && (
        <>
          {type === 'image' ? (
            <img
              src={src}
              alt={alt}
              className={`${styles.media} ${!isLoading ? styles.loaded : ''}`}
              onLoad={handleLoad}
              onError={handleError}
              loading="lazy"
            />
          ) : (
            <video
              src={src}
              poster={poster}
              autoPlay={autoPlay}
              muted={muted}
              loop={loop}
              playsInline
              className={`${styles.media} ${!isLoading ? styles.loaded : ''}`}
              onLoadedData={handleLoad}
              onError={handleError}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MediaWrapper;
