import {
  Box,
  Grid,
  Paper,
  Button,
  Typography,
  IconButton,
  CircularProgress,
  Container,
  Avatar,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { Iconify } from 'src/components/iconify';
import { ViewDoc } from 'src/components/viewDoc';
import { useViewDocsMutation } from 'src/redux/slices/common/auth';
import { toast } from 'src/components/snackbar';
const projects = [
  'dse',
  'dsp',
  'arch',
  'bba',
  'hmct',
  'dhmct',
  'dsewp',
  'mba',
  'mca',
  'mpharm',
  'march',
  'mhmct',
  'mbale',
  'mcale',
  'mbawp',
  'mcawp',
  'phd',
  'sct',
  'dtehmct',
  'dsdwp',
];

const dummyFiles = [
  { name: 'Admission_Form_2025.pdf', size: '2.4 MB', date: '2025-06-15', type: 'pdf' },
  { name: 'Fee_Structure.xlsx', size: '1.2 MB', date: '2025-06-10', type: 'excel' },
  { name: 'Brochure.pdf', size: '5.1 MB', date: '2025-05-28', type: 'pdf' },
  { name: 'Guidelines.docx', size: '0.8 MB', date: '2025-06-18', type: 'word' },
  { name: 'Campus_Map.jpg', size: '3.5 MB', date: '2025-06-05', type: 'image' },
];

const fileIcons = {
  pdf: 'vscode-icons:file-type-pdf2',
  excel: 'vscode-icons:file-type-excel2',
  word: 'vscode-icons:file-type-word2',
  image: 'vscode-icons:file-type-image',
};

export default function Upload() {
  const [selectedProject, setSelectedProject] = useState('phd');
  const [files, setFiles] = useState(dummyFiles);
  const [uploading, setUploading] = useState(false);
  const [fetchFiles, { data, isLoading }] = useViewDocsMutation();
  const fileInputRef = useRef(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (data) {
      const projectFiles = data[selectedProject] || [];
      setFiles(
        projectFiles.map((file) => ({
          name: file,
          size: '0 KB',
          date: new Date().toISOString().split('T')[0],
          type: file.split('.').pop(),
        }))
      );
    }
  }, [data, selectedProject]);

  useEffect(() => {
    fetchFiles();
  }, []);

  console.log(data, 'data');

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    fetchFiles();
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', fileInputRef.current.files[0]);

      const response = await fetch(`${import.meta.env.VITE_UPLOAD_API_URL}/${selectedProject}/`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('admintoken'),
          //   'Content-Type': 'multipart/form-data'
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      fetchFiles(); // Refresh files list
    } catch (error) {
      console.error('Upload error:', error);
      // Optionally show error to user
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      await handleUpload();
      e.target.value = ''; // Reset input
    }
  };

  const handleDelete = async (fileName) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DELETE_API_URL}/${selectedProject}/`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('admintoken'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filenames: [fileName] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Delete failed');
      }

      const result = await response.json();
      fetchFiles(); // Refresh files list
    } catch (error) {
      console.error('Delete error:', error);
      // Optionally show error to user
    }
  };
  const [isViewDocOpen, setIsViewDocOpen] = useState({
    open: false,
    data: '',
  });

  const handleCloseIsViewDoc = () => {
    setIsViewDocOpen({ open: false, data: '' });
  };

  const handleClickOpen = (data) => {
    setOpen({ open: true, data: data });
  };

  const handleClose = () => {
    setOpen({ open: false, data: null });
  };

  const handleViewFile = async (fileName, data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_VIEW_API_URL}/${selectedProject}/`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('admintoken'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filenames: [fileName] }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch file');
      }

      const result = await response.json();

      // Handle JSON response with base64 content
      if (result.files && result.files[fileName]) {
        const base64Data = result.files[fileName].split(',')[1] || result.files[fileName];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(blob);

        // Open PDF in new window
        const pdfWindow = window.open('', '_blank');
        pdfWindow.document.write(`
          <html>
            <head>
              <title>PDF Viewer</title>
              <style>body { margin: 0; }</style>
            </head>
            <body>
              <embed 
                src="${fileUrl}" 
                type="application/pdf" 
                width="100%" 
                height="100%"
              />
            </body>
          </html>
        `);

        // Clean up after 10 seconds
        setTimeout(() => {
          URL.revokeObjectURL(fileUrl);
        }, 10000);
        return;
      }

      throw new Error('File content not found in response');
    } catch (error) {
      console.error('View error:', error);
      alert(`Failed to view file: ${error.message}`);
    }
  };

  const handleProcess = async () => {
    setProcessing(true);
    try {
      const response = await fetch('https://9x2g83pl-8509.inc1.devtunnels.ms/admin/reload/', {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('admintoken'),
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to process');
      }

      const result = await response.json();
      toast.success('Processing completed successfully');
      fetchFiles(); // Refresh files list
    } catch (error) {
      console.error('Process error:', error);
      toast.error(`Processing failed: ${error.message}`, { variant: 'error' });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 3 }}>
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<Iconify icon="eva:upload-fill" />}
            disabled={uploading}
          >
            Upload
            <input type="file" hidden onChange={handleFileChange} ref={fileInputRef} />
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:refresh-outline" />}
            onClick={handleProcess}
            disabled={processing}
          >
            {processing ? <CircularProgress size={24} /> : 'Process'}
          </Button>
        </Box>
      </Box> */}

      {/* Main Content - Horizontal Layout */}
      <Grid container spacing={3}>
        {/* Left Panel - Projects */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" mb={2} color="primary">
              Projects
            </Typography>
            <Grid container spacing={1}>
              {projects.map((project) => (
                <Grid item key={project} xs={6} sm={4} md={6}>
                  <Button
                    fullWidth
                    size="small"
                    variant={selectedProject === project ? 'contained' : 'outlined'}
                    onClick={() => handleProjectSelect(project)}
                    sx={{
                      textTransform: 'uppercase',
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                    }}
                  >
                    {project}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Middle Panel - Files */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" color="primary">
                Files for {selectedProject.toUpperCase()}
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<Iconify icon="eva:upload-fill" />}
                disabled={uploading}
              >
                Upload
                <input type="file" hidden onChange={handleFileChange} ref={fileInputRef} />
              </Button>
            </Box>

            {isLoading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : files.length === 0 ? (
              <Box display="flex" justifyContent="center" p={4}>
                <Typography variant="body1" color="text.secondary">
                  No data available
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: '500px', overflow: 'auto' }}>
                {files.map((file, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 1.5,
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': { boxShadow: 1 },
                    }}
                  >
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.light' }}>
                      <Iconify icon={fileIcons[file.type] || 'mdi:file'} width={24} />
                    </Avatar>
                    <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                      <Typography noWrap fontWeight="medium">
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {file.size} • {file.date}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleViewFile(file.name)}
                      >
                        <Iconify icon="eva:eye-fill" width={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(file.name)}
                      >
                        <Iconify icon="eva:trash-2-fill" width={18} />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Right Panel - Chatbot */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%', boxShadow: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="h6" mb={2} color="primary">
                Chatbot
              </Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:refresh-outline" />}
                onClick={handleProcess}
                disabled={processing}
              >
                {processing ? <CircularProgress size={24} /> : 'Process'}
              </Button>
            </Box>
            <iframe
              src={import.meta.env.VITE_CHATBOT_IFRAME_URL}
              width="100%"
              height="500px"
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              title="Chatbot"
            />
          </Paper>
        </Grid>
      </Grid>
      <ViewDoc open={isViewDocOpen.open} data={isViewDocOpen.data} close={handleCloseIsViewDoc} />
    </Container>
  );
}
