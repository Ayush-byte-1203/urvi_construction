import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div
      className="not-found-page flex-center"
      style={{ minHeight: '80vh', padding: '10rem 2rem 6rem' }}
    >
      <Helmet>
        <title>Page Not Found (404) | BuildCraft Constructions</title>
        <meta name="description" content="The page you requested could not be found. Return to the BuildCraft homepage." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container text-center" style={{ maxWidth: '600px' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{ width: 'fit-content', margin: '0 auto' }}
        >
          <Compass size={64} className="accent-text mb-4" />
        </motion.div>

        <span className="text-overline" style={{ display: 'block', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
          Error 404
        </span>

        <h1 className="display-md" style={{ marginBottom: '1.25rem' }}>
          Blueprint Misaligned
        </h1>

        <p className="subheading" style={{ margin: '0 auto 3rem', textAlign: 'center' }}>
          The structural path you requested does not exist in our coordinates register.
          It may have been relocated or archived.
        </p>

        <Link to="/" className="btn btn-primary">
          <Home size={16} />
          Return to Headquarters
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
