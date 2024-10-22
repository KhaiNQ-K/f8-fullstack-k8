'use client';

import { Paper } from '@mui/material';
import Image from 'next/image';
import F8 from '@/assets/f8.jpg';
import { useState } from 'react';

export default function ImageSideBar() {
  const [hovered, setHovered] = useState(false);

  return (
    <Paper
      sx={{
        width: '262px',
        height: '262px',
        p: 2,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
      elevation={3}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={F8}
        alt="F8"
        layout="fill"
        style={{
          transition: 'transform 0.5s ease', // Smooth transition
          transform: hovered
            ? 'scale(1.2)' // On hover: move up and scale
            : 'scale(1)', // Default: no movement or scaling
        }}
      ></Image>
    </Paper>
  );
}
