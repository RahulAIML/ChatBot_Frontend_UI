import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

export function ViewDoc({ open, data, close }) {
  console.log(data?.fileUrl);
  return (
    <div>
      {' '}
      <Dialog
        open={open}
        onClose={close}
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            width: '95vw', // 95% of viewport width
            height: '95vh', // 95% of viewport height
            maxWidth: 'none', // allows custom width
            maxHeight: 'none', // allows custom height
          },
        }}
      >
        <DialogTitle backgroundColor="primary.main" color="common.white">
          {data?.name ?? 'File'}{' '}
        </DialogTitle>
        <DialogContent
          sx={{
            overflowY: 'auto',
            height: 'calc(80vh - 64px)',
          }}
        >
          <div>
            <iframe
              src={data?.fileUrl}
              width={'100%'}
              height={'700px'}
              allowFullScreen
              autoFocus
            ></iframe>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
