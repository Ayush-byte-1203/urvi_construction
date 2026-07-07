import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';
import Button from '@components/Button';
import styles from './ErrorState.module.css';

const ErrorState = ({
  title = 'Structural Alignment Error',
  message = 'A network or routing calculation issue has disconnected this layout.',
  onRetry,
  ctaText = 'Return to Headquarters',
  ctaLink = '/'
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <ShieldAlert size={48} className="anim-float" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>

      <div className={styles.buttons}>
        {onRetry && (
          <Button 
            variant="primary" 
            onClick={onRetry}
            iconLeft={<RefreshCw size={14} />}
          >
            Retry Connection
          </Button>
        )}
        <Link to={ctaLink}>
          <Button variant={onRetry ? 'secondary' : 'primary'} iconLeft={<Home size={14} />}>
            {ctaText}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorState;
