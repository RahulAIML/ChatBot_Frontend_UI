import React from 'react';
import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Divider,
    TextField,
    Typography,
    Card,
    CardContent,
    Accordion,
    FormHelperText,
    AccordionSummary,
    AccordionDetails,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    // TableCard,
    Paper,
    Button,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Link as RouterLink,
    Avatar,
    CardActions,
    Checkbox,
    IconButton,
    Switch,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

import styled from '@mui/system/styled';
// import Looggo from '../../../../assets/cetlogo.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import { SplashScreen } from "../splash-screen";
// import getProfileImage from '../getPhoto';

const HeaderBox = styled(Box)({
    backgroundColor: '#1a73e8',
    padding: '15px',
    borderRadius: '25px 25px 0 0',
    color: '#fff',
    // marginTop: -8,
    // paddingLeft: 2,
});

const TableCard = styled(Card)({
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '6',
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#5DADE2 ',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        height: '40px', // Set the desired height
        padding: '2px', // Adjust padding as needed
    },
}));

function TableComponent({ data: { data, column, title, isLoading } }) {
    const { i18n, t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [keys, setKeys] = useState([]);
    const [rows, setRows] = useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = rows?.filter((row) =>
        keys.some((key) => row[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );

    useEffect(() => {
        if (data?.data) {
            setRows(data.data);
            if (data.data.length > 0) {
                setKeys(Object.keys(data.data[0]));
            }
            console.log(data);
        }
    }, [data]);

    // useEffect(() => {
    //   const rows = document.querySelectorAll("table tbody tr");
    //   rows.forEach((row) => {
    //     const shouldHighlight = row.textContent
    //       .toLowerCase()
    //       .includes(searchTerm.toLowerCase());
    //     if (shouldHighlight) {
    //       row.classList.remove("hide-table-row");
    //     } else {
    //       row.classList.add("hide-table-row");
    //     }
    //   });
    // }, [searchTerm]);
    // console.log(data);

    return (
        <>
            <Box id='section-to-print' sx={{ height: '100%', overflow: 'hidden' }}>
                <TableCard>
                    <Grid container spacing={2} fullWidth>
                        <Grid item xs={12} md={10}>
                            <HeaderBox>
                                <Typography variant='h6'>{t(title)}</Typography>
                            </HeaderBox>
                        </Grid>
                        <Grid id='section-not-to-print' item xs={12} md={2}>
                            <TextField
                                type='text'
                                sx={{ width: '100%', borderRightColor: '#83def' }}
                                placeholder='Search...'
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </Grid>
                    </Grid>
                    <CardContent>
                        <TableContainer
                            component={Paper}
                            className='printable-table'
                            //  component={Paper}
                            sx={{
                                // borderRadius: '7px',
                                maxHeight: '54vh',

                                '&::-webkit-scrollbar': {
                                    width: '8px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#6ba6ff',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '10px',
                                },
                            }}
                        >
                            <Table stickyHeader>
                                <TableHead sx={{ backgroundColor: '#cddefa' }}>
                                    <TableRow>
                                        {column?.length > 0
                                            ? column.map((col, index) => (
                                                    <TableCell
                                                        key={index}
                                                        align='center'
                                                        style={{
                                                            padding: '10px',
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {col}
                                                    </TableCell>
                                                ))
                                            : null}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rows && rows.length > 0 ? (
                                        rows.map((row, id) => (
                                            <TableRow
                                                key={id}
                                                style={{
                                                    backgroundColor:
                                                        id % 2 === 0 ? '#fafafa' : '#eeeeee',
                                                }}
                                            ></TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={column.length} align='center'>
                                                {isLoading ? 'Loading....' : 'No Data Available'}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            id='section-not-to-print'
                            rowsPerPageOptions={[25, 50, 100, 250, 500, 1000]}
                            component='div'
                            count={data?.data?.length || 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                                bgcolor: '#f5f5f5',
                                color: '#1976d2',
                                mt: '5px',
                                borderRadius: '10px',
                                '& .MuiTablePagination-toolbar': {
                                    bgcolor: '#e3f2fd',
                                },
                                '& .MuiTablePagination-actions': {
                                    color: '#1976d2',
                                },
                                '& .MuiTablePagination-selectLabel': {
                                    color: '#1976d2',
                                },
                                '& .MuiTablePagination-select': {
                                    color: '#1976d2',
                                },
                                '& .MuiTablePagination-selectIcon': {
                                    color: '#1976d2',
                                },
                                '& .MuiTablePagination-displayedRows': {
                                    color: '#1976d2',
                                },
                                '& .MuiInputBase-root': {
                                    color: '#1976d2',
                                },
                            }}
                        />
                    </CardContent>
                </TableCard>
            </Box>

            {/* <Box
        id="section-not-to-print"
        sx={{ display: "flex", mt: "3", justifyContent: "center" }}
      >
        <Button
          onClick={printForm}
          style={{ background: "#0288d1", color: "#fff" }}
        >
          Print
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          style={{ left: "2%", background: "#cb4444", color: "#fff" }}
        >
          back
        </Button>
      </Box> */}
            <style>
                {`
        .headingCOlmin {
            min-width: 1px;
            font-weight: bold; 
        }
        .row-color-even {
            background-color: #e0f2f1;
        }
        .row-color-odd {
            background-color: #e0f2f1;
        }
    `}
                {`
        .id-column {
            color: blue; /* Set color for cells in the ID column */
        }
        .name-column {
            color: green; /* Set color for cells in the Name column */
        }
    `}
                {`
        .id-header {
            background-color: #e0f2f1; /* Set background color for the header of the ID column */
            color: black; /* Set text color for the header of the ID column */
        }
        .name-header {
            background-color: #e0f2f1; /* Set background color for the header of the Name column */
            color: black; /* Set text color for the header of the Name column */
        }
    `}
                {`
        .row-border {
            border-bottom: 1px solid #bdbdbd; /* Add a black border to the bottom of each row */
        }
    `}
                {`
        .cell-border {
            border-right: 1px solid #f5f6f7;
              /* Add a black border to the right of each cell */
        }
    `}
                {`
        @media print {
            body * {
                visibility: hidden;
            }

            .printable-table,
            .printable-table * {
                visibility: visible;
            }

            .printable-table {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            .printable-table .MuiTableCell-body{
                border: 1px solid black !important; /* Add border to DataGrid */
            }
            .printable-table .MuiTableCell-head{
                border-bottom: 2px solid black !important;
                border-right: 2px solid #1c1d1f !important;
            }
            .MuiDataGrid-root {
                border: 1px solid black; /* Add border to DataGrid */
            }
            .MuiTable-root {
                border-collapse: collapse; /* Ensure table borders are collapsed */
                width: 100%; /* Ensure table width spans the printable area */
                font-size: 4px; /* Reduce font size for printing */
            }
            .MuiTableCell-root,
            .MuiTableHead-root,
            .MuiTableRow-root {
                border: 1px solid black; /* Add border to table cells and rows */
                padding: 0px 1px; /* Reduce padding for printing */
                margin: 0; /* Remove any margins */
            }
            .MuiTableHead-root {
                background-color: #f0f0f0; /* Set background color for table head */
            }
            .MuiTableCell-head {
                color: #000; /* Set text color for table head cells */
                font-weight: bold; /* Make table head text bold */
            }
            .MuiTypography-root {
                color: #000; /* Set text color for typography */
            }
            .MuiDataGrid-toolbarContainer {
                display: none; /* Hide toolbar when printing */
            }
            .MuiDataGrid-colCell {
                border-right: 1px solid black; /* Add right border to column cells */
            }
            @page {
                size: landscape;
                margin: 5mm; /* Reduce page margin */
            }
            header, footer {
                display: none;
            }
            .print_header, .print-button {
                display: block;
            }
                #section-to-print .MuiBox-root {
                font-weight: bold; /* Ensure header is bold when printing */
            }
        }
    `}
                {`
        @media screen {
            .print_header, .print-button {
                display: none;
            }
        }
        @media print {
            .print_header, .print-button {
                display: block;
            }
        }
    `}
            </style>
        </>
    );
}

export default TableComponent;
