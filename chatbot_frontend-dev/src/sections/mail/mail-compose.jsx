import React, { useState, useCallback, useRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Portal from '@mui/material/Portal';
import Backdrop from '@mui/material/Backdrop';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import {
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogContent,
  Dialog,
  TextField,
  MenuItem,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { varAlpha } from 'src/theme/styles';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';

import { LoadingButton } from '@mui/lab';
import { toast } from 'src/components/snackbar';
import axios from 'axios';
import { useGetSubjectsMutation } from 'src/redux/slices/common/message-box';
// ----------------------------------------------------------------------

const POSITION = 20;

// ----------------------------------------------------------------------

export function MailCompose({ onCloseCompose }) {
  const smUp = useResponsive('up', 'sm');
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [getSubjects, { data: subjectList }] = useGetSubjectsMutation();
  const fullScreen = useBoolean();

  const [message, setMessage] = useState('');
  const [sub, setSub] = useState('');
  const handleChangeMessage = useCallback((value) => {
    setMessage(value);
  }, []);

  const fileRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];

    if (selectedFile && allowedTypes?.includes(selectedFile.type)) {
      setSelectedFile(selectedFile);
      console.log(selectedFile, 'selectedFile');
    } else {
      toast.error('Please drop an Excel file.');
      fileRef.current.value = null;
    }
  };

  const [loading, setloading] = useState(false);

  const getApiUrl = () => {
    switch (user?.groupID) {
      case 6:
        return `${import.meta.env.VITE_COMMON_API_URL}common/mail/InstitutecomposeMessage`;
      case 3:
        return `${import.meta.env.VITE_COMMON_API_URL}common/mail/FCComposeMessage`;
      case 5:
        return `${import.meta.env.VITE_COMMON_API_URL}common/mail/CandidatecomposeMessage`;
      default:
        return null;
    }
  };

  const gettoken = () => {
    switch (user?.groupID) {
      case 6:
        return `${localStorage.getItem(`${import.meta.env.VITE_APPNAME_SMALL}instituteToken`)}`;
      case 3:
        return `${localStorage.getItem(`${import.meta.env.VITE_APPNAME_SMALL}fcToken`)}`;
      case 5:
        return `${localStorage.getItem(`${import.meta.env.VITE_APPNAME_SMALL}candidateToken`)}`;
      default:
        return null;
    }
  };
  const apiUrl = getApiUrl();
  const tokenName = gettoken();
  const handelFinalSubmit = async () => {
    try {
      setloading(true);
      const bodyFormData = new FormData();
      let flag = false;
      if (flag) {
        return;
      }
      if (selectedFile) {
        bodyFormData.append(`file`, selectedFile);
      }

      bodyFormData.append(`subject`, sub);
      bodyFormData.append(`message`, message);

      const res = await axios.post(apiUrl, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tokenName}`,
        },
      });

      if (res.status == 200) {
        toast.success(res.data?.message);
        setSub('');
        setSelectedFile(null);
        onCloseCompose();
      }
      setloading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <Portal>
      {(fullScreen.value || !smUp) && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal - 1 }} />
      )}

      <Paper
        sx={{
          maxWidth: 560,
          right: POSITION,
          borderRadius: 2,
          display: 'flex',
          bottom: POSITION,
          position: 'fixed',
          overflow: 'hidden',
          flexDirection: 'column',
          zIndex: (theme) => theme.zIndex.modal,
          width: `calc(100% - ${POSITION * 2}px)`,
          boxShadow: (theme) => theme.customShadows.dropdown,
          ...(fullScreen.value && {
            maxWidth: 1,
            height: `calc(100% - ${POSITION * 2}px)`,
          }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ bgcolor: 'background.neutral', p: (theme) => theme.spacing(1.5, 1, 1.5, 2) }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            New message
          </Typography>

          <IconButton onClick={fullScreen.onToggle}>
            <Iconify icon={fullScreen.value ? 'eva:collapse-fill' : 'eva:expand-fill'} />
          </IconButton>

          <IconButton onClick={onCloseCompose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Stack>

        {/* <InputBase
          placeholder="To"
          endAdornment={
            <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle2' }}>
              <Box sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Cc</Box>
              <Box sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Bcc</Box>
            </Stack>
          }
          sx={{
            px: 2,
            height: 48,
            borderBottom: (theme) =>
              `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        /> */}

        <Box sx={{ display: 'flex', mt: 2, mb: 2, p: 2 }}>
          <Typography variant="subtitle2">Send To : &nbsp; </Typography>
          <Typography variant="subtitle2"> Admin</Typography>
          {user?.groupID == 3 && (
            <>
              ,&nbsp;
              <Typography variant="subtitle2"> {subjectList?.data?.roDetals?.username}</Typography>
            </>
          )}
        </Box>

        {/* <FormControl fullWidth sx={{ ml: 2 }} size="small">
          <TextField name="subject" value={sub} label="" onChange={(e) => setSub(e.target.value)} />
        </FormControl> */}
        <FormControl fullWidth sx={{ ml: 2, pr: 4 }} size="small">
          {user?.groupID == 6 ? (
            <>
              <TextField
                name="subject"
                value={sub}
                label=""
                onChange={(e) => setSub(e.target.value)}
              />
            </>
          ) : (
            <>
              <TextField
                select
                name="sub"
                value={sub}
                label="Subject"
                onChange={(e) => setSub(e.target.value)}
              >
                {subjectList &&
                  subjectList?.data?.list?.map((e, index) => (
                    <MenuItem value={e.id} key={index}>
                      {e.name}
                    </MenuItem>
                  ))}
              </TextField>
            </>
          )}
        </FormControl>

        <Stack
          spacing={2}
          flexGrow={1}
          sx={{
            p: 2,
            flex: '1 1 auto',
            overflow: 'hidden',
          }}
        >
          <Editor
            value={message}
            onChange={handleChangeMessage}
            placeholder="Type a message"
            slotProps={{
              wrap: {
                ...(fullScreen.value && { minHeight: 0, flex: '1 1 auto' }),
              },
            }}
            sx={{
              maxHeight: 480,
              ...(fullScreen.value && { maxHeight: 1, flex: '1 1 auto' }),
            }}
          />

          <Stack direction="row" alignItems="center">
            <Stack direction="row" alignItems="center" flexGrow={1}>
              {/* Hidden file input */}
              <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={fileRef}
              />

              {/* Clickable label for file input */}
              <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                <IconButton component="span">
                  <Iconify icon="eva:attach-2-fill" />
                </IconButton>
              </label>

              {/* Display selected file name or instructions */}
              <Typography variant="subtitle2">
                {selectedFile
                  ? selectedFile.name
                  : '(Allowed File : jpg,jpeg,png,gif,pdf,doc,xlsx,doc,docx)'}
              </Typography>
              {selectedFile && (
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <Box>
                    <IconButton
                      size="small"
                      component="span"
                      sx={{ color: 'error.main' }}
                      onClick={() => {
                        setSelectedFile(null);
                      }}
                    >
                      <Iconify icon="mingcute:close-line" />
                    </IconButton>
                  </Box>
                </Box>
              )}
            </Stack>

            {/* Send button */}
            <LoadingButton
              variant="contained"
              color="primary"
              endIcon={<Iconify icon="iconamoon:send-fill" />}
              loading={loading}
              // disabled={stateForSend.length === 0}
              onClick={handelFinalSubmit}
            >
              Send
            </LoadingButton>
          </Stack>
        </Stack>
      </Paper>
    </Portal>
  );
}

// const router = require('express').Router();
// const controller = require('../../controllers/common/mail');
// const {
//   candidateAndFCInstiAuth,
//   FCAuth,
//   InstituteOnlyAuth,
//   candidateAuth,
// } = require('../../middlewares/authCandidate');

// router.get('/getAllComposeMessage', candidateAndFCInstiAuth, controller.getAllComposeMessage);
// router.get('/subjectsForMessage', candidateAndFCInstiAuth, controller.subjectsForMessage);
// router.get('/getAllReplyMessage', candidateAndFCInstiAuth, controller.getAllReplyMessage);
// router.post('/starMessage', candidateAndFCInstiAuth, controller.starMessage);
// router.post('/CandidateComposeMessage', candidateAuth, controller.CandidateComposeMessage);
// router.post('/CandidateReplyMessage', candidateAuth, controller.CandidateReplyMessage);
// router.post('/FCComposeMessage', FCAuth, controller.FCComposeMessage);
// router.post('/FCReplyMessage', FCAuth, controller.FCReplyMessage);
// router.post('/CandidateComposeMessage', InstituteOnlyAuth, controller.InstitutecomposeMessage);
// router.post('/InstituteReplyMessage', InstituteOnlyAuth, controller.InstituteReplyMessage);

// module.exports = router;
