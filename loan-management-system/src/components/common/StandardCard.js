import React from 'react';
import { Card, CardContent, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';

const StandardCard = ({
  children,
  variant = 'default', // 'default', 'feature', 'testimonial', 'status'
  elevation = 3,
  animated = true,
  delay = 0,
  hover = true,
  height = 'auto',
  sx = {},
  ...props
}) => {
  // Define standard dimensions and styles for different card types
  const cardStyles = {
    default: {
      borderRadius: 3,
      overflow: 'hidden',
      height: height === 'auto' ? 'auto' : height,
      transition: 'all 0.3s ease',
      ...sx
    },
    feature: {
      borderRadius: 3,
      p: 4,
      textAlign: 'center',
      height: 280, // Standard height for feature cards
      minHeight: 280,
      width: 250, // Standard width for feature cards
      minWidth: 250,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      ...sx
    },
    testimonial: {
      borderRadius: 3,
      height: 300, // Standard height for testimonial cards
      minHeight: 300,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      ...sx
    },
    status: {
      borderRadius: 3,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      ...sx
    },
    info: {
      borderRadius: 3,
      p: 3,
      height: 200, // Standard height for info cards
      minHeight: 200,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      ...sx
    }
  };

  // Define hover effects for different variants
  const hoverStyles = {
    default: hover ? {
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
      }
    } : {},
    feature: hover ? {
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }
    } : {},
    testimonial: hover ? {
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
      }
    } : {},
    status: hover ? {
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
      }
    } : {},
    info: hover ? {
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.12)'
      }
    } : {}
  };

  const CardComponent = variant === 'feature' || variant === 'info' ? Paper : Card;

  const cardContent = (
    <CardComponent
      elevation={elevation}
      sx={{
        ...cardStyles[variant],
        ...hoverStyles[variant]
      }}
      {...props}
    >
      {variant === 'testimonial' ? (
        <CardContent sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: 3 
        }}>
          {children}
        </CardContent>
      ) : variant === 'default' || variant === 'status' ? (
        children
      ) : (
        children
      )}
    </CardComponent>
  );

  // Animation wrapper
  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        style={{ height: '100%' }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default StandardCard;