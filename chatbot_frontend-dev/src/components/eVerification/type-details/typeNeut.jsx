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
					<Typography variant='subtitle2'> Type of Candidature :- </Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant='subtitle2' fontWeight={'bold'}>
						{data?.data?.typeofCandidature}
					</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant='subtitle2'>
						{' '}
						District from which Candidate has passed SSC:-{' '}
					</Typography>
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography variant='subtitle2' fontWeight={'bold'}>
						{data?.data?.districtName}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default TypeA;
