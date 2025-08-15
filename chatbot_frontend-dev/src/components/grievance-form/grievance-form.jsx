import React from 'react';
import { Box, Grid, TextField, Card, Typography } from '@mui/material';

const GrievanceForm = ({
  grievanceData, // Object containing the grievance-related state
  onGrievanceChange, // Handler for grievance text field
  onFileChange, // Handler for file upload
  allowedFileTypes = ['jpg', 'jpeg', 'png', 'bmp', 'pdf'], // Optional file types
  maxFileSize = '1 MB', // Optional max file size
}) => {
  const { grivance, grivanceErr, grivanceErrMsg } = grievanceData;

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Grievance Text Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            rows={4}
            label="Grievance"
            value={grivance}
            error={grivanceErr}
            helperText={grivanceErrMsg}
            required
            multiline
            onChange={(e) => {onGrievanceChange(e)}}
            name="grivance"
          />
        </Grid>

        {/* File Upload */}
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center" flexDirection="row" mt={1}>
            <label htmlFor="file-upload">
              <input
                type="file"
                accept={allowedFileTypes.map((type) => `.${type}`).join(',')}
                id="file-upload"
                name="file"
                onChange={onFileChange}
              />
            </label>
          </Box>
          <Box mt={2}>
            <Card sx={{ bgcolor: 'error.lightRed', p: 2 }}>
              <Typography>
                File Types Allowed: <b>{allowedFileTypes.join(', ')}</b>
              </Typography>
              <Typography>
                Max File Size Allowed: <b>{maxFileSize}</b>
              </Typography>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GrievanceForm;
