import React from 'react'
import { useGetCandidateDataFormHomeMutation } from '@/redux/slices/eVerification';
import {
    Card,
    Grid,
    Typography
} from '@mui/material'
import axios from 'axios';
import { useEffect,useState } from 'react';
function CandidateDetails({userId}) {
    const [profilePic, setprofilePic] = useState('');

    const [getData, { data }] = useGetCandidateDataFormHomeMutation();
	
    const getProfileImage = async (imageData) => {
		try {
			const profileImage = await axios.get(
				` ${import.meta.env.VITE_API_URL}common/getFile?filename=${imageData}&flag=1`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					responseType: 'blob',
				}
			);

			console.log(profileImage?.data);

			if (profileImage.status == 200) {
				const url = URL.createObjectURL(profileImage.data);
				setprofilePic(url);
			}
		} catch (error) {
			console.log(error);
		}
	};

    useEffect(() => {
		getData({ candidateId: userId });
	}, []);

    useEffect(() => {
		if (data?.data?.imagename) {
			getProfileImage(data?.data?.imagename);
		}
	}, [data]);

    console.log(data);
  
  return (
    <Card sx={{
        p: 1.5,
        borderRadius: '10px',
        border: '1px solid #dbd9d9',
        // mt: 2,
		backgroundColor:'transparent',
        marginBottom:2
    }}
>
    <Grid container spacing={2} >
					<Grid item container xs={12} md={4}>
						<img src={profilePic} width={'50px'} />
					</Grid>
					<Grid item container xs={12} md={8}>
						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2'>
								Application ID :{' '}
								<strong>{import.meta.env.VITE_PREFIX + data?.data?.user_id}</strong>
							</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2'>
								Version : <strong>{data?.data?.version}</strong>
							</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2'>
								Candidate Name : <strong>{data?.data.full_name}</strong>
							</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2'>
								Gender : <strong>{data?.data.Gender}</strong>
							</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant='subtitle2'>
								Candidature Type : <strong>{data?.data?.candidatureType}</strong>
							</Typography>
						</Grid>
					</Grid>
				</Grid>
                </Card>
  )
}

export default CandidateDetails