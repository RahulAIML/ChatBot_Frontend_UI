import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { BackToTop } from 'src/components/animate/back-to-top';
import { useTheme } from '@mui/material/styles';

import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';
import HeroSection from '../tabs';
import InfoCards from '../cards';
import ChatbotWidget from 'src/components/chatBot';
// ----------------------------------------------------------------------

export function HomeView() {
  const theme = useTheme();

  const pageProgress = useScrollProgress();

  return (
    <>
      {/* <BackToTop /> */}
      {/* {Number(import.meta.env.VITE_CHATBOT) == 1 && <ChatbotWidget />} */}
      <HeroSection />
      {/* <InfoCards /> */}
    </>
  );
}
