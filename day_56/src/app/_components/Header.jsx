'use client';
import styled from '@emotion/styled';
import { AppBar, Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import Logo from '@/assets/f8_icon.png';
import Link from 'next/link';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SwitchLang from './SwitchLang';
import dynamic from 'next/dynamic';
export default function Header() {
  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    position: 'sticky',
  }));
  const ToggleThemeMode = dynamic(() => import('./ToggleThemeMode'), { ssr: false });
  return (
    <Box flexGrow={1}>
      <StyledAppBar>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width: '50px',
                  height: '50px',
                }}
              >
                <Image src={Logo} alt="F8" width="50" height="50" objectFit="cover" />
              </Box>
              <Typography>Fullstack.edu.vn F8</Typography>
              <Box>
                <Link href={'/'}>Home</Link>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <GoogleIcon />
              <FacebookIcon />
              <YouTubeIcon />
              <ToggleThemeMode />
              <SwitchLang />
            </Box>
          </Box>
        </Container>
      </StyledAppBar>
    </Box>
  );
}
