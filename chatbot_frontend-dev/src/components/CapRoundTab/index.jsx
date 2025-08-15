import React from 'react';
import {
  Box,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
} from '@mui/material';

const Index = ({ round, handleChange }) => {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: '10px',
        border: '1px solid #dbd9d9',
        mt: 2,
        height: '100%',
      }}
    >
      <Tabs value={round} onChange={handleChange}>
        <Tab value={'1'} label="CAP - I" />
        <Tab value={'2'} label="CAP - II" />
        <Tab value={'3'} label="CAP - III" />
        <Tab value={'4'} label="CAP - IV" />
      </Tabs>
    </Box>
  );
};

export default Index;
