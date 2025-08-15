import { useEffect, useCallback, useState } from 'react';

import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useGetMail, useGetMails, useGetLabels } from 'src/actions/mail';
import { useSelector } from 'react-redux';
import { Layout } from '../layout';
import { MailNav } from '../mail-nav';
import { MailList } from '../mail-list';
import { MailHeader } from '../mail-header';
import { MailCompose } from '../mail-compose';
import { MailDetails } from '../mail-details';
import {
  useGetAllComposeMessageMutation,
  useGetAllReplyMessageMutation,
} from 'src/redux/slices/common/message-box';
// ----------------------------------------------------------------------

const LABEL_INDEX = 'all';
const selectedNav = 3;
// ----------------------------------------------------------------------
const labelList = {
  labels: [
    {
      id: 'all',
      type: 'system',
      name: 'all',
      unreadCount: 0,
      readStatus: 3,
    },

    {
      id: 'sent',
      type: 'system',
      name: 'sent',
      unreadCount: 0,
      readStatus: 5,
    },
  ],
  labelsLoading: false,
  labelsValidating: false,
  labelsEmpty: false,
};

export function MailView() {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();

  const selectedLabelId = searchParams.get('label') ?? LABEL_INDEX;

  const selectedMailId = searchParams.get('id') ?? '';

  const mdUp = useResponsive('up', 'md');

  const openNav = useBoolean();

  const openMail = useBoolean();

  const openCompose = useBoolean();

  const { labels, labelsLoading, labelsEmpty } = labelList;
  const [singleMessage, setSingleMessage] = useState(null);
  // const { mail, mailLoading, mailError } = useGetMail(selectedMailId);
  const [getAllComposeMessage, { data: mails, isLoading: mailsLoading, isError: mailsError }] =
    useGetAllComposeMessageMutation();
  const mailsEmpty = mails?.data?.length > 0 ? false : true;
  const [
    getAllReplyMessage,
    { data: replyData, isLoading: mailLoading, isError: mailError, isSuccess },
  ] = useGetAllReplyMessageMutation();
  useEffect(() => {
    if (replyData && isSuccess) {
      setSingleMessage(replyData?.data);
    }
  }, [isSuccess, replyData]);
  const handelClose = (data) => {
    setSingleMessage(null);
    if (!data) {
      const [readStatus] = labelList?.labels.filter((item) => item.name == selectedLabelId);
      getAllComposeMessage({ readStatus: readStatus?.readStatus });
    }
  };

  useEffect(() => {
    const [readStatus] = labelList?.labels.filter((item) => item.name == selectedLabelId);
    getAllComposeMessage({ readStatus: readStatus?.readStatus });
  }, [selectedNav, openCompose]);

  const handleToggleCompose = useCallback(() => {
    if (openNav.value) {
      openNav.onFalse();
    }
    openCompose.onToggle();
  }, [openCompose, openNav]);
  const getPath = () => {
    switch (user?.groupID) {
      case 6:
        return paths.institute.message;
      case 3:
        return paths.fc.message;
      case 5:
        return paths.candidate.message;
      default:
        return null;
    }
  };
  const handleClickLabel = useCallback(
    (labelId) => {
      setSingleMessage(null);
      if (!mdUp) {
        openNav.onFalse();
      }
      const [readStatus] = labelList?.labels.filter((item) => item.name == labelId);

      getAllComposeMessage({ readStatus: readStatus?.readStatus });
      if (labelId) {
        const href = labelId !== LABEL_INDEX ? `${getPath()}?label=${labelId}` : getPath();
        router.push(href);
      }
    },
    [openNav, router, mdUp]
  );

  // useEffect(() => {
  //   if (mailsError || mailError) {
  //     router.push(paths.institute.message);
  //   }
  // }, [mailError, mailsError, router]);

  const handleClickMail = async (mailId) => {
    getAllReplyMessage({ toReply: mailId });
  };

  useEffect(() => {
    if (openCompose.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [openCompose.value]);

  return (
    <>
      <Layout
        sx={{
          p: 1,
          borderRadius: 2,
          flex: '1 1 auto',
          bgcolor: 'white',
        }}
        replyData={singleMessage}
        slots={{
          header: (
            <MailHeader
              onOpenNav={openNav.onTrue}
              onOpenMail={mailsEmpty ? undefined : openMail.onTrue}
              sx={{ display: { md: 'none' } }}
            />
          ),
          nav: (
            <MailNav
              labels={labels}
              empty={labelsEmpty}
              loading={labelsLoading}
              openNav={openNav.value}
              onCloseNav={openNav.onFalse}
              selectedLabelId={selectedLabelId}
              handleClickLabel={handleClickLabel}
              onToggleCompose={handleToggleCompose}
            />
          ),
          list: (
            <MailList
              mails={mails?.data ?? []}
              empty={mailsEmpty}
              loading={mailsLoading || labelsLoading}
              openMail={openMail.value}
              onCloseMail={openMail.onFalse}
              onClickMail={handleClickMail}
              selectedLabelId={selectedLabelId}
              selectedMailId={selectedMailId}
            />
          ),
          details: (
            <MailDetails
              mail={singleMessage}
              empty={mailsEmpty}
              loading={mailsLoading || mailLoading}
              renderLabel={(id) => labels.filter((label) => label.id === id)[0]}
              handelClose={handelClose}
            />
          ),
        }}
      />

      {openCompose.value && <MailCompose onCloseCompose={openCompose.onFalse} />}
    </>
  );
}
