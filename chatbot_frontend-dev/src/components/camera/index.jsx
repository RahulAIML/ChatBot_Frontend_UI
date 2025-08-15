import {
	Box,
	Card,
	Container,
	Divider,
	TextField,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Paper,
	Button,
} from '@mui/material';
import Webcam from 'react-webcam';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Compress from 'browser-image-compression';

export async function loader() {
	await new Promise((r) => setTimeout(r, 500));
	return 'I came from the About.tsx loader function!';
}

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

const videoConstraints = {
	facingMode: FACING_MODE_USER,
};

const Camera = ({ setfinalFile, setprofilePic, handleClose }) => {
	const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);
	const [noCamera, setnoCamera] = React.useState(false);

	const handleClick = React.useCallback(() => {
		setFacingMode((prevState) =>
			prevState === FACING_MODE_USER ? FACING_MODE_ENVIRONMENT : FACING_MODE_USER
		);
	}, []);

	const webcamRef = React.useRef(null);
	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();

		// var image = new Image();
		// image.src = imageSrc;
		// document.body.appendChild(image);
		// console.log(image, "images");
		// console.log(singleData);

		let file = null;

		fetch(imageSrc)
			.then((res) => res.blob())
			.then((blob) => {
				console.log(blob);
				const newUrl = window.URL.createObjectURL(blob);
				setprofilePic(newUrl);

				// file = new File([blob], 'File name', { type: 'image/png' });

				fetch(newUrl)
					.then((response) => response.blob())
					.then((blob) => {
						// Create a File object from the blob
						file = new File([blob], `file.jpeg`, { type: blob.type });

						console.log(file, 'file');

						const options = {
							// As the key specify the maximum size
							// Leave blank for infinity
							maxSizeMB: 0.048,
							// Use webworker for faster compression with
							// the help of threads
							useWebWorker: true,
						};

						Compress(file, options)
							.then((compressedBlob) => {
								// Compressed file is of Blob type
								// You can drop off here if you want to work with a Blob file
								console.log(compressedBlob);

								// If you want to work with the File
								// Let's convert it here, by adding a couple of attributes
								compressedBlob.lastModifiedDate = new Date();

								// Conver the blob to file
								const convertedBlobFile = new File([compressedBlob], file.name, {
									type: file.type,
									lastModified: Date.now(),
								});
								setfinalFile(convertedBlobFile);
								handleClose();
								// Here you are free to call any method you are gonna use to upload your file example uploadToCloudinaryUsingPreset(convertedBlobFile)
							})
							.catch((e) => {
								// Show the user a toast message or notification that something went wrong while compressing file
							});
					})
					.catch((error) => {
						// Handle any errors that occur during the process
						console.error('Error fetching blob data:', error);
					});
			});
	}, [webcamRef]);

	const videoConstraints = {
		width: 1280,
		height: 720,
		// facingMode: 'environment',
	};
	return (
		<Box p={2}>
			<Webcam
				audio={false}
				height={'100%'}
				ref={webcamRef}
				screenshotFormat='image/jpeg'
				width={'100%'}
				videoConstraints={{ ...videoConstraints, facingMode: facingMode }}
				onUserMediaError={() => {
					setnoCamera(true);
					// alert('Camera is not supported');

					toast.error('Camera is not supported');
					handleClose();
				}}
			/>
			<Button variant='contained' onClick={capture} disabled={noCamera}>
				Capture photo
			</Button>
			<Button variant='contained' onClick={handleClick} sx={{ ml: 1 }} disabled={noCamera}>
				Switch camera
			</Button>
		</Box>
	);
};

export default Camera;
