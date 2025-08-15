import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { darken, lighten, alpha as hexAlpha } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { maxLine, stylesMode } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { Scrollbar } from 'src/components/scrollbar';
import { EmptyContent } from 'src/components/empty-content';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { LoadingScreen } from 'src/components/loading-screen';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// import { useStarredOrUnstarredMutation } from 'src/redux/slices/admin/message-box/index';
import { toast } from 'src/components/snackbar';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { ViewDoc } from 'src/components/viewDoc';
import { useGetFileMutation } from 'src/redux/slices/common/getFile';
// ----------------------------------------------------------------------

export function MailDetails({ mail, renderLabel, empty, loading, handelClose }) {
  const { user } = useSelector((state) => state.auth);
  const showAttachments = useBoolean(true);
  // const [
  //   updateStar,
  //   { data: starredData, isSuccess: starredIsSucces, isError: starredIsError, error: starredError },
  // ] = useStarredOrUnstarredMutation();

  // useEffect(() => {
  //   if (starredIsSucces && starredData) {
  //     toast.success(starredData?.message);
  //   }
  // }, [starredData, starredIsSucces]);

  // useEffect(() => {
  //   if (starredIsError && starredError) {
  //     toast.success(starredError?.message);
  //   }
  // }, [starredError, starredIsError]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [sendloading, setloading] = useState(false);
  const [message, setMessage] = useState('');
  const fileRef = useRef(null);
  const handleChangeMessage = useCallback((value) => {
    setMessage(value);
  }, []);

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
  const getApiUrl = () => {
    switch (user?.groupID) {
      case 6:
        return `${import.meta.env.VITE_COMMON_API_URL}common/mail/InstituteReplyMessage`;
      case 3:
        return `${import.meta.env.VITE_COMMON_API_URL}common/mail/FCReplyMessage`;
      case 5:
        return `${import.meta.env.VITE_COMMON_API_URL}common/mail/CandidateReplyMessage`;
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
  const [getFile, { isLoading }] = useGetFileMutation();
  const [isViewDocOpen, setIsViewDocOpen] = useState({
    open: false,
    data: '',
  });

  const handleCloseIsViewDoc = () => {
    setIsViewDocOpen({ open: false, data: '' });
  };
  const getProfileImage = async (name, data) => {
    try {
      const profileImage = await getFile({ filename: name, flag: 6 });
      if (profileImage?.data) {
        const url = URL.createObjectURL(profileImage?.data);
        setIsViewDocOpen({ open: true, data: { ...data, fileUrl: url } });
      }
    } catch (error) {
      console.log(error);
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

      bodyFormData.append(`toReply`, mail?.originalMessage?.id);
      bodyFormData.append(`message`, message);

      const res = await axios.post(apiUrl, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tokenName}`,
        },
      });

      if (res.status == 200) {
        toast.success(res.data?.message);
        setSelectedFile(null);
        handelClose();
      } else {
        // console.log(res.data.message);
      }
      setloading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
      setloading(false);
    }
  };
  if (loading) {
    return <LoadingScreen />;
  }

  if (empty || !mail) {
    return (
      <EmptyContent
        title="No conversation selected"
        description="Select a conversation to read"
        imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-email-selected.svg`}
      />
    );
  }

  const renderHead = (
    <>
      <Box display="flex" justifyContent={'flex-end'}>
        <Tooltip title="Close">
          <IconButton onClick={() => handelClose('n')}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );

  const renderSubject = (
    <>
      <Typography variant="subtitle2" sx={{ ...maxLine({ line: 2 }), flex: '1 1 auto' }}>
        Subject: {mail?.originalMessage?.subject}
      </Typography>

      <Stack spacing={0.5}>
        <Typography variant="caption" noWrap sx={{ color: 'text.disabled' }}>
          {fDateTime(mail?.originalMessage?.created)}
        </Typography>
      </Stack>
    </>
  );

  const renderSender = (
    <>
      <Avatar
        alt={mail?.originalMessage?.from_username}
        src={
          mail?.originalMessage?.from?.avatarUrl ? `${mail?.originalMessage?.from?.avatarUrl}` : ''
        }
        sx={{ mr: 2 }}
      >
        {mail?.originalMessage?.from_username.charAt(0).toUpperCase()}
      </Avatar>

      <Stack spacing={0.5} sx={{ width: 0, flexGrow: 1 }}>
        <Box gap={0.5} display="flex">
          <Typography component="span" variant="subtitle2" sx={{ flexShrink: 0 }}>
            {mail?.originalMessage?.from_username}
          </Typography>
          {mail?.originalMessage?.email && (
            <Typography component="span" noWrap variant="body2" sx={{ color: 'text.secondary' }}>
              {`<${mail?.originalMessage?.email}>`}
            </Typography>
          )}
        </Box>

        <Typography noWrap component="span" variant="caption" sx={{ color: 'text.secondary' }}>
          {`To: `}

          <Link color="inherit" sx={{ '&:hover': { color: 'text.primary' } }}>
            {`${mail?.originalMessage?.to_username} , `}
          </Link>
          {`From: `}
          <Link color="inherit" sx={{ '&:hover': { color: 'text.primary' } }}>
            {`${mail?.originalMessage?.from_username} `}
          </Link>
        </Typography>
      </Stack>
    </>
  );

  const renderAttachments = (
    <Stack spacing={1} sx={{ p: 1, borderRadius: 1, bgcolor: 'background.neutral' }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        onClick={() => {
          getProfileImage(mail?.originalMessage?.attachment);
        }}
      >
        <ButtonBase
          onClick={showAttachments.onToggle}
          sx={{
            borderRadius: 0.5,
            typography: 'caption',
            color: 'text.secondary',
          }}
        >
          <Iconify icon="eva:attach-2-fill" sx={{ mr: 0.5 }} />
          {mail?.originalMessage?.attachment}
        </ButtonBase>

        <LoadingButton
          sx={{
            py: 0.5,
            gap: 0.5,
            px: 0.75,
            borderRadius: 0.75,
            typography: 'caption',
            fontWeight: 'fontWeightSemiBold',
          }}
          loading={isLoading}
          disabled={isLoading}
        >
          <Iconify width={18} icon="solar:eye-bold" /> View
        </LoadingButton>
      </Box>
    </Stack>
  );

  const renderContent = (
    <Markdown
      children={mail?.originalMessage?.message}
      sx={{ px: 2, '& p': { typography: 'body2' } }}
    />
  );

  const renderReply = mail?.getReplyMessage?.map((item, index, array) => {
    return (
      <Accordion
        key={index}
        sx={{ mb: 1, boxShadow: 'none' }}
        elevation={0}
        paperProps={{ square: true }}
        style={{ boxShadow: 'none' }}
        defaultExpanded={index === array.length - 1}
      >
        {/* Accordion Summary - Click to Expand */}
        <AccordionSummary sx={{ px: 2 }}>
          <Box display="flex" alignItems="center" flexShrink={0}>
            <Avatar
              alt={item.from_username}
              src={item?.from?.avatarUrl ? `${item?.from?.avatarUrl}` : ''}
              sx={{ mr: 2 }}
            >
              {item?.from_username.charAt(0).toUpperCase()}
            </Avatar>

            <Stack spacing={0.5} sx={{ width: 0, flexGrow: 1 }}>
              <Box gap={0.5} display="flex">
                <Typography component="span" variant="subtitle2" sx={{ flexShrink: 0 }}>
                  {item?.from_username}
                </Typography>

                <Stack spacing={0.5} mt={0.3}>
                  <Typography variant="caption" noWrap sx={{ color: 'text.disabled' }}>
                    {fDateTime(item?.created)}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </AccordionSummary>

        {/* Accordion Details - Content Inside */}
        <AccordionDetails sx={{ px: 2, pb: 2 }}>
          {!!item?.attachment && (
            <Stack sx={{ px: 2, mt: 2 }}>
              <Stack spacing={1} sx={{ p: 1, borderRadius: 1, bgcolor: 'background.neutral' }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  onClick={() => {
                    getProfileImage(item?.attachment);
                  }}
                >
                  <ButtonBase
                    onClick={showAttachments.onToggle}
                    sx={{
                      borderRadius: 0.5,
                      typography: 'caption',
                      color: 'text.secondary',
                    }}
                  >
                    <Iconify icon="eva:attach-2-fill" sx={{ mr: 0.5 }} />
                    {item?.attachment}
                  </ButtonBase>

                  <LoadingButton
                    sx={{
                      py: 0.5,
                      gap: 0.5,
                      px: 0.75,
                      borderRadius: 0.75,
                      typography: 'caption',
                      fontWeight: 'fontWeightSemiBold',
                    }}
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    <Iconify width={18} icon="solar:eye-bold" /> View
                  </LoadingButton>
                </Box>
              </Stack>
            </Stack>
          )}

          <Scrollbar sx={{ mt: 2, flex: '1 1 240px' }}>
            <Markdown children={item?.message} sx={{ px: 2, '& p': { typography: 'body2' } }} />
          </Scrollbar>
        </AccordionDetails>
      </Accordion>
    );
  });

  const renderEditor = (
    <>
      <Editor sx={{ maxHeight: 320 }} value={message} onChange={handleChangeMessage} />

      <Box display="flex" alignItems="center">
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

        <Stack flexGrow={1} />

        <LoadingButton
          color="primary"
          variant="contained"
          endIcon={<Iconify icon="iconamoon:send-fill" />}
          loading={sendloading}
          onClick={handelFinalSubmit}
        >
          Send
        </LoadingButton>
      </Box>
    </>
  );

  return (
    <>
      <Box
        display="flex"
        justifyContent={'flex-end'}
        flexShrink={0}
        sx={{ pl: 2, pr: 1, height: 56 }}
      >
        {renderHead}
      </Box>

      <Box
        gap={2}
        flexShrink={0}
        display="flex"
        sx={(theme) => ({
          p: 2,
          borderTop: `1px dashed ${theme.vars.palette.divider}`,
          borderBottom: `1px dashed ${theme.vars.palette.divider}`,
        })}
      >
        {renderSubject}
      </Box>

      <Box display="flex" alignItems="center" flexShrink={0} sx={{ pt: 2, px: 2 }}>
        {renderSender}
      </Box>

      {!!mail?.originalMessage?.attachment && (
        <Stack sx={{ px: 2, mt: 2 }}> {renderAttachments} </Stack>
      )}

      <Box>{renderContent}</Box>
      {mail?.getReplyMessage?.length > 0 && <Box>{renderReply}</Box>}

      <Stack flexShrink={0} spacing={2} sx={{ p: 2 }}>
        {renderEditor}
      </Stack>
      <ViewDoc open={isViewDocOpen.open} data={isViewDocOpen.data} close={handleCloseIsViewDoc} />
    </>
  );
}
