import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  ListItem,
  ListItemIcon,
  Divider,
  CardHeader,
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
// import { useGetFileMutation } from 'src/redux/slices/common/getFile';
import { ViewDoc } from 'src/components/viewDoc';
import { paths } from 'src/routes/paths';
import { useNavigate } from 'react-router';
import { AnalyticsWidgetSummary } from 'src/components/analytics-widget-summary';

const generatePdfOpener = (fileName) => {
  return fileName
    ? () => window.open(`${import.meta.env.VITE_SUBFOLDER_NAME}/assets/pdf/${fileName}`)
    : null;
};

const finalMerit = [
  {
    title: `MH Candidates`,
    path: generatePdfOpener(import.meta.env.VITE_MH_CANDIDATES_FINAL_MERIT_DETAILS),
    backgroundColor: '#F58705',
    buttonColor: '#bd660d',
  },
  {
    title: `AI Candidates`,
    path: generatePdfOpener(import.meta.env.VITE_AI_CANDIDATES_FINAL_MERIT_DETAILS),
    backgroundColor: '#065471',
    buttonColor: '#0F3E4F',
  },
];

const provisionalMerit = [
  {
    title: `MH Candidates`,
    path: generatePdfOpener(import.meta.env.VITE_MH_CANDIDATES_PROVISIONAL_MERIT_DETAILS),
    backgroundColor: '#0A91AB',
    buttonColor: '#0F7487',
  },
  {
    title: `AI Candidates`,
    path: generatePdfOpener(import.meta.env.VITE_AI_CANDIDATES_PROVISIONAL_MERIT_DETAILS),
    backgroundColor: '#5F60A2',
    buttonColor: '#3A3B78',
  },
];

const provisionalVacancy = [
  {
    title: `Seat Matrix`,
    //path: generatePdfOpener(import.meta.env.VITE_CAP2_PROVISIONAL_VACANCY),
    buttonTitle: `Click To Visit`,
    backgroundColor: '#FFE7D9',
    buttonColor: '#7A0916',
  },
  {
    title: `CAP Round II`,
    path: generatePdfOpener(import.meta.env.VITE_CAP2_PROVISIONAL_VACANCY),
    buttonTitle: `Click To Visit`,
    backgroundColor: '#FFF3CD',
    buttonColor: '#7A4100',
  },
  {
    title: `CAP Round III`,
    path: generatePdfOpener(import.meta.env.VITE_CAP3_PROVISIONAL_VACANCY),
    buttonTitle: `Click To Visit`,
    backgroundColor: '#FFF3CD',
    buttonColor: '#7A4100',
  },
  {
    title: `CAP Round IV`,
    path: generatePdfOpener(import.meta.env.VITE_CAP4_PROVISIONAL_VACANCY),
    buttonTitle: `Click To Visit`,
    backgroundColor: '#FFE7D9',
    buttonColor: '#7A0916',
  },
];

const allotmentPrint = [
  {
    title: `CAP Round I`,
    buttonTitle: `View`,
    path: () => (window.location.pathname = paths.allotmentMeritIndex(1)),
    backgroundColor: '#CCF7DE',
    buttonColor: '#004B50',
  },
  {
    title: `CAP Round II`,
    buttonTitle: `View`,
    path: () => (window.location.pathname = paths.allotmentMeritIndex(2)),
    backgroundColor: '#ECD6FF',
    buttonColor: '#27097A',
  },
  {
    title: `CAP Round III`,
    buttonTitle: `View`,
    path: () => (window.location.pathname = paths.allotmentMeritIndex(3)),
    backgroundColor: '#ECD6FF',
    buttonColor: '#27097A',
  },
  {
    title: `CAP Round IV`,
    buttonTitle: `View`,
    path: () => (window.location.pathname = paths.allotmentMeritIndex(4)),
    backgroundColor: '#CCF7DE',
    buttonColor: '#004B50',
  },
];

const tableData = [
  {
    year: '2025 - 2026',
    type: 'MH',
    seatMatrix: generatePdfOpener(import.meta.env.VITE_SEAT_MATRIX_2025_26),
    capRound1: generatePdfOpener(import.meta.env.VITE_CAP1_CUT_OFF_2025_26),
    capRound2: generatePdfOpener(import.meta.env.VITE_CAP2_CUT_OFF_2025_26),
    capRound3: generatePdfOpener(import.meta.env.VITE_CAP3_CUT_OFF_2025_26),
    capRound4: '',
  },
  {
    year: '2024 - 2025',
    type: 'AI & MH',
    seatMatrix: generatePdfOpener(import.meta.env.VITE_SEAT_MATRIX_2024_25),
    capRound1: {
      AI: generatePdfOpener(import.meta.env.VITE_CAP1_CUT_OFF_2024_25_AI),
      MH: generatePdfOpener(import.meta.env.VITE_CAP1_CUT_OFF_2024_25),
    },
    capRound2: {
      AI: generatePdfOpener(import.meta.env.VITE_CAP2_CUT_OFF_2024_25_AI),
      MH: generatePdfOpener(import.meta.env.VITE_CAP2_CUT_OFF_2024_25),
    },
    capRound3: {
      AI: generatePdfOpener(import.meta.env.VITE_CAP3_CUT_OFF_2024_25_AI),
      MH: generatePdfOpener(import.meta.env.VITE_CAP3_CUT_OFF_2024_25),
    },
    capRound4: {
      AI: '',
      MH: '',
    },
  },
  {
    year: '2023 - 2024',
    type: 'AI & MH',
    seatMatrix: generatePdfOpener(import.meta.env.VITE_SEAT_MATRIX_2023_24),
    capRound1: {
      AI: generatePdfOpener(import.meta.env.VITE_CAP1_CUT_OFF_2023_24_AI),
      MH: generatePdfOpener(import.meta.env.VITE_CAP1_CUT_OFF_2023_24),
    },
    capRound2: {
      AI: generatePdfOpener(import.meta.env.VITE_CAP2_CUT_OFF_2023_24_AI),
      MH: generatePdfOpener(import.meta.env.VITE_CAP2_CUT_OFF_2023_24),
    },
    capRound3: {
      AI: generatePdfOpener(import.meta.env.VITE_CAP3_CUT_OFF_2023_24_AI),
      MH: generatePdfOpener(import.meta.env.VITE_CAP3_CUT_OFF_2023_24),
    },
    capRound4: {
      AI: '',
      MH: '',
    },
  },
];

const InfoCards = () => {
  // const [getFile, { isSuccess, data: fileData }] = useGetFileMutation();

  const [isViewDocOpen, setIsViewDocOpen] = useState({
    open: false,
    data: '',
  });

  const navigate = useNavigate();

  const handleCloseIsViewDoc = () => {
    setIsViewDocOpen({ open: false, data: '' });
  };

  const getProfileImage = async (name, data) => {
    try {
      const profileImage = await getFile({ filename: name, flag: 4 });
      if (profileImage?.data) {
        console.log(profileImage?.data);
        const url = URL.createObjectURL(profileImage?.data);
        setIsViewDocOpen({ open: true, data: { ...data, fileUrl: url } });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  borderTop: '1px solid #000',
                  position: 'relative',
                  textAlign: 'center',
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    p: 1,
                    borderRadius: '10px',
                    zIndex: 2,
                    width: { xs: '80%', md: 'auto' },
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Provisional Merit Details
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {provisionalMerit.map((card, index) => (
                <Grid item xs={12} sm={6} key={`prov-${index}`}>
                  <Card
                    sx={{
                      backgroundColor: card.backgroundColor,
                      color: '#fff',
                      textAlign: 'center',
                      boxShadow: 3,
                      border: '1px solid white',
                      borderRadius: '6px',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {card.title.toUpperCase()}
                      </Typography>
                      <Button
                        fullWidth
                        onClick={card.path}
                        sx={{
                          backgroundColor: card.buttonColor,
                          color: '#fff',
                          borderRadius: 0.6,
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: '#00000088',
                          },
                        }}
                      >
                        Click to Visit
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* Final Merit Section */}
          <Grid item xs={12} md={6}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  borderTop: '1px solid #000',
                  position: 'relative',
                  textAlign: 'center',
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    p: 1,
                    borderRadius: '10px',
                    zIndex: 2,
                    width: { xs: '80%', md: 'auto' },
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Final Merit Details
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Cards */}
            <Grid container spacing={2}>
              {finalMerit.map((card, index) => (
                <Grid item xs={12} sm={6} key={`final-${index}`}>
                  <Card
                    sx={{
                      backgroundColor: card.backgroundColor,
                      color: '#fff',
                      textAlign: 'center',
                      boxShadow: 3,
                      border: '1px solid white',
                      borderRadius: '6px',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                        {card.title.toUpperCase()}
                      </Typography>
                      <Button
                        fullWidth
                        onClick={card.path}
                        sx={{
                          backgroundColor: card.buttonColor,
                          color: '#fff',
                          borderRadius: 0.6,
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: '#00000088',
                          },
                        }}
                      >
                        Click to Visit
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  borderTop: '1px solid #000',
                  position: 'relative',
                  textAlign: 'center',
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    p: 1,
                    borderRadius: '10px',
                    zIndex: 2,
                    width: { xs: '80%', md: 'auto' },
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Allotment Print
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Cards */}
            <Grid container spacing={2}>
              {allotmentPrint.map((card, index) => (
                <Grid item xs={12} sm={6} key={`final-${index}`}>
                  <AnalyticsWidgetSummary
                    title={card.title}
                    OnClickEvent={card.path}
                    buttonTitle={card.buttonTitle}
                    backgroundColor={card.backgroundColor}
                    styleColor={card.buttonColor}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 3 }}>
              <Box
                sx={{
                  borderTop: '1px solid #000',
                  position: 'relative',
                  textAlign: 'center',
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    p: 1,
                    borderRadius: '10px',
                    zIndex: 2,
                    width: { xs: '80%', md: 'auto' },
                  }}
                >
                  <Typography variant="body1" fontWeight="bold">
                    Provisional Vacancy
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Grid container spacing={2}>
              {provisionalVacancy.map((card, index) => (
                <Grid item xs={12} sm={6} key={`prov-${index}`}>
                  <AnalyticsWidgetSummary
                    title={card.title}
                    OnClickEvent={card.path}
                    buttonTitle={card.buttonTitle}
                    backgroundColor={card.backgroundColor}
                    styleColor={card.buttonColor}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Card
        sx={{
          m: 1,
          my: 2,
          border: '1px solid rgb(235, 229, 229)',
          boxShadow: `0px 2px 2px rgba(0, 0, 0, 0.10)`,
        }}
      >
        <CardHeader title={'Seat Matrix and Cut Off Lists of CAP Round'} sx={{ mb: 3 }} />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>Year</TableCell>
                <TableCell rowSpan={2}>Seat Matrix</TableCell>
                <TableCell colSpan={2}>CAP Round-I Cut Off</TableCell>
                <TableCell colSpan={2}>CAP Round-II Cut Off</TableCell>
                <TableCell colSpan={2}>CAP Round-III Cut Off</TableCell>
                <TableCell colSpan={2}>CAP Round-IV Cut Off</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>AI</TableCell>
                <TableCell>MH</TableCell>
                <TableCell>AI</TableCell>
                <TableCell>MH</TableCell>
                <TableCell>AI</TableCell>
                <TableCell>MH</TableCell>
                <TableCell>AI</TableCell>
                <TableCell>MH</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="subtitle2" textAlign="start">
                      {row.year}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.seatMatrix ? 'pointer' : 'default',
                      }}
                      variant="subtitle2"
                      textAlign="start"
                      onClick={row.seatMatrix ? () => row.seatMatrix() : undefined}
                    >
                      {row.seatMatrix ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      onClick={row.capRound1?.AI}
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.capRound1?.AI ? 'pointer' : 'default',
                      }}
                    >
                      {row.capRound1?.AI ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.capRound1?.MH ? 'pointer' : 'default',
                      }}
                      onClick={row.capRound1?.MH}
                    >
                      {row.capRound1?.MH ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.capRound2?.AI ? 'pointer' : 'default',
                      }}
                      onClick={row.capRound2?.AI}
                    >
                      {row.capRound2?.AI ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.capRound2?.MH ? 'pointer' : 'default',
                      }}
                      onClick={row.capRound2?.MH}
                    >
                      {row.capRound2?.MH ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.capRound3?.AI ? 'pointer' : 'default',
                      }}
                      onClick={row.capRound3?.AI}
                    >
                      {row.capRound3?.AI ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.capRound3?.MH ? 'pointer' : 'default',
                      }}
                      onClick={row.capRound3?.MH}
                    >
                      {row.capRound3?.MH ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.capRound4?.AI ? 'pointer' : 'default',
                      }}
                      onClick={row.capRound4?.AI}
                    >
                      {row.capRound4?.AI ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        cursor: row.capRound4?.MH ? 'pointer' : 'default',
                      }}
                      onClick={row.capRound4?.MH}
                    >
                      {row.capRound4?.MH ? <Iconify icon="ic:baseline-download" /> : '-'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Card>
      <ViewDoc open={isViewDocOpen.open} data={isViewDocOpen.data} close={handleCloseIsViewDoc} />
    </>
  );
};

export default InfoCards;
