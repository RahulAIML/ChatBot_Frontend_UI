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
} from '@mui/material';

const TypeA = ({ data }) => {
  console.log(data?.data);

  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: '10px',
        border: '1px solid #dbd9d9',
        // mt: 2,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2"> Type of Candidature :- </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight={'bold'}>
            Maharashtra State Candidate - Type B
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">
            {' '}
            Whose domicile Cerificate You are uploading at Facilitation centre :-{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight={'bold'}>
            {data?.data?.candidateDetails?.domicile_type_name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">
            {' '}
            Select the District from where Candidate / Father / Mother of Candidate is Domiciled in
            the State of Maharashtra :-{' '}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight={'bold'}>
            {data?.data?.candidateDetails?.mainDistrictName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2"> Home University :- </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          {data?.data?.home_university == '0' ? (
            <Typography variant="subtitle2" fontWeight={'bold'}>
              Other than Home University
            </Typography>
          ) : (
            <Typography variant="subtitle2" fontWeight={'bold'}>
              {data?.data?.candidateDetails?.home_university}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TypeA;
