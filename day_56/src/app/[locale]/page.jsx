'use client';
import {
  Box,
  Button,
  Chip,
  Container,
  List,
  ListItem,
  Paper,
  Tooltip,
  tooltipClasses,
  Typography,
} from '@mui/material';
import MuiLink from '@mui/material/Link';
import Header from '../_components/Header';
import Image from 'next/image';
import ImageSideBar from '../_components/ImageSideBar';
import Link from 'next/link';
import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
export default function Home() {
  const GreenToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#18c964',
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  const t = useTranslations('HomePage');
  return (
    <Container maxWidth={false} disableGutters>
      <Header />
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ mt: 4, p: 2, borderRadius: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography flexBasis="100%" textAlign="center" variant="h5" component="h1">
              Fullstack.edu.vn F8
            </Typography>
            <Box
              flexBasis="25%"
              sx={{
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'center',
              }}
            >
              <ImageSideBar />
              <Typography textAlign="center" component="span" mt={1}>
                Front-end developer
              </Typography>

              <Typography component="h2" variant="h5" fontWeight="normal">
                {t('Skills.Title')}
              </Typography>
              <Box
                sx={{
                  pb: 1,
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Typography fontWeight="bold" component="span" mr={1}>
                  {t('Skills.Work.Label')}:
                </Typography>
                <Typography component="span">{t('Skills.Work.Value')}</Typography>
              </Box>
              <Box
                sx={{
                  pb: 1,
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Typography fontWeight="bold" component="span" mr={1}>
                  {t('Skills.Other.Label')}:
                </Typography>
                <Typography component="span">{t('Skills.Other.Value')}</Typography>
              </Box>
              <Typography component="h2" variant="h5" fontWeight="normal">
                {t('History.Title')}
              </Typography>
              <Box
                sx={{
                  pb: 1,
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Typography fontWeight="bold" component="span" mr={1}>
                  2016:
                </Typography>
                <Typography component="span">{t('History.First')}</Typography>
              </Box>
              <Box
                sx={{
                  pb: 1,
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Typography fontWeight="bold" component="span" mr={1}>
                  2017-2019:
                </Typography>
                <Typography component="span">{t('History.Second')}</Typography>
              </Box>
              <Box
                sx={{
                  pb: 1,
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Typography fontWeight="bold" component="span" mr={1}>
                  2019-2021:
                </Typography>
                <Typography component="span">{t('History.Thirth')}</Typography>
              </Box>
              <Box
                sx={{
                  pb: 1,
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Typography fontWeight="bold" component="span" mr={1}>
                  2022-2023:
                </Typography>
                <Typography component="span">{t('History.Fourth')}</Typography>
              </Box>
            </Box>
            <Box flex={1}>
              <Typography textAlign="center" variant="h5" component="h2">
                {t('Contact.Title')}
              </Typography>
              <Box
                sx={{
                  borderBottom: '1px solid #ccc',
                  color: (theme) => `${theme.palette.text.secondary}`,
                }}
              >
                <Typography>
                  Phone:{' '}
                  <Link href="tel:0987654321" passHref legacyBehavior>
                    <MuiLink>0987654321</MuiLink>
                  </Link>
                </Typography>
                <Typography>
                  Zalo: <Link href="https://zalo.me">https://zalo.me</Link>
                </Typography>
                <Typography>
                  Email:{' '}
                  <Link href="mailto:contact@fullstack.edu.vn">contact@fullstack.edu.vn</Link>
                </Typography>
                <Typography>
                  Facebook:{' '}
                  <Link href="https://www.facebook.com/groups/f8official">
                    https://www.facebook.com/groups/f8official
                  </Link>
                </Typography>
                <Typography>
                  Youtube:{' '}
                  <Link href="https://www.youtube.com/c/F8VNOfficial">
                    https://www.youtube.com/c/F8VNOfficial
                  </Link>
                </Typography>
              </Box>
              <Paper elevation={2} sx={{ mt: 3, p: 2.5 }}>
                <Typography textAlign="center" variant="h5" component="h2">
                  {t('SelfProject.Title')}
                </Typography>
                <Box
                  sx={{
                    borderBottom: '1px solid #ccc',
                    py: 1,
                  }}
                >
                  <Typography variant="h6" component="h3">
                    Project Code snippet
                  </Typography>
                  <Typography variant="body1" component="p" fontWeight="normal">
                    {t('SelfProject.Snippet.PFirst')}
                  </Typography>
                  <Typography variant="body1" component="p" fontWeight="normal" width="100%">
                    {t('SelfProject.Snippet.PSecond')}
                  </Typography>
                  <Box mt={1}>
                    <GreenToolTip title="https://codefast.vercel.app/">
                      <Button>Demo</Button>
                    </GreenToolTip>
                    <GreenToolTip title="https://codefast.vercel.app/">
                      <Button>Demo</Button>
                    </GreenToolTip>
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderBottom: '1px solid #ccc',
                    py: 1,
                  }}
                >
                  <Typography variant="h6" component="h3">
                    Project blog
                  </Typography>
                  <Typography variant="body1" component="p" fontWeight="normal">
                    {t('SelfProject.Blog.PFirst')}
                  </Typography>
                  <Typography variant="body1" component="p" fontWeight="normal" width="100%">
                    {t('SelfProject.Blog.PSecond')}
                  </Typography>
                  <Box mt={1}>
                    <GreenToolTip title="https://codefast.vercel.app/">
                      <Button>Demo</Button>
                    </GreenToolTip>
                    <GreenToolTip title="https://codefast.vercel.app/">
                      <Button>Demo</Button>
                    </GreenToolTip>
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderBottom: '1px solid #ccc',
                    py: 1,
                  }}
                >
                  <Typography variant="h6" component="h3">
                    Project 20f8
                  </Typography>
                  <Typography variant="body1" component="p" fontWeight="normal">
                    {t('SelfProject.20f8.PFirst')}
                  </Typography>
                  <Typography variant="body1" component="p" fontWeight="normal" width="100%">
                    {t('SelfProject.20f8.PSecond')}
                  </Typography>
                  <Box mt={1}>
                    <GreenToolTip title="https://codefast.vercel.app/">
                      <Button>Demo</Button>
                    </GreenToolTip>
                    <GreenToolTip title="https://codefast.vercel.app/">
                      <Button>Demo</Button>
                    </GreenToolTip>
                  </Box>
                </Box>
                <Box mt={3}>
                  <Link href="https://github.com/KhaiNQ-K">
                    Github: https://github.com/KhaiNQ-K
                  </Link>
                </Box>
              </Paper>
              <Box sx={{ mt: 3, pl: 2.5 }}>
                <Typography textAlign="center" variant="h5" component="h2">
                  {t('Hobby.Title')}
                </Typography>
                <List sx={{ listStyleType: 'disc' }}>
                  <ListItem sx={{ display: 'list-item', p: 1 }}>{t('Hobby.First')}</ListItem>
                  <ListItem sx={{ display: 'list-item', p: 1 }}>{t('Hobby.Second')}</ListItem>
                  <ListItem sx={{ display: 'list-item', p: 1 }}>{t('Hobby.Thirth')}</ListItem>
                </List>
              </Box>
              <Typography textAlign="center">
                © 2024 Fullstack.edu.vn F8. All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Container>
  );
}
