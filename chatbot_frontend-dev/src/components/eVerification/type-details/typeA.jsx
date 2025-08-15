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
            {data?.data?.candidateDetails?.typeofCandidature}
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
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">
            District from which Candidates passing HSC or passing diploma in Engineering or
            Technology or Pharmacy :-
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight={'bold'}>
            {data?.data?.candidateDetails?.hscDistrictName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2">
            District from which Candidate has Passed / Appearing for Graduation :-
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" fontWeight={'bold'}>
            {data?.data?.candidateDetails?.dipDistrictName}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TypeA;
