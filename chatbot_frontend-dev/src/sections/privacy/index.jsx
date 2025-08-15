import React from 'react';
import { Box, Typography, CardContent, Card, Container } from '@mui/material';

export function Privacy({ sx, ...other }) {
  return (
    <Box sx={{ py: 2 }}>
      <Container>
        {/* Title Section */}
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            Privacy Policy
          </Typography>
        </Box>

        {/* Content Card */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" paragraph>
              This Site does not automatically capture any specific personal information from you,
              (like name, phone number or e-mail address), that allows us to identify you
              individually.
            </Typography>
            <Typography variant="subtitle2" paragraph>
              If the Site requests you to provide personal information, you will be informed for the
              particular purposes for which the information is gathered and adequate security
              measures will be taken to protect your personal information.
            </Typography>
            <Typography variant="subtitle2" paragraph>
              We do not sell or share any personally identifiable information volunteered on the
              website to any third party (public/private). Any information provided to this website
              will be protected from loss, misuse, unauthorized access or disclosure, alteration, or
              destruction.
            </Typography>

            {/* Hyperlinking Policy */}
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
              Hyperlinking Policy
            </Typography>
            <Typography variant="subtitle2" paragraph>
              <strong>Links to External Websites/Portals:</strong>
            </Typography>
            <Typography variant="subtitle2" paragraph>
              At many places in this portal, you shall find links to other websites/portals created
              and maintained by other Government, non-Government / private organisations. These
              links have been placed for your convenience. When you select a link you are navigated
              to that website. Once on that website, you are subject to the privacy and security
              policies of the owners/sponsors of the website. M.Arch is not responsible for the
              contents and reliability of the linked websites and does not necessarily endorse the
              views expressed in them. Mere presence of the link or its listing on this portal
              should not be assumed as endorsement of any kind.
            </Typography>
            <Typography variant="subtitle2" paragraph>
              <strong>Links to the M.Arch Website by Other Websites/Portals:</strong>
            </Typography>
            <Typography variant="subtitle2" paragraph>
              We do not object you for linking directly to the information that is hosted on our
              site and no prior permission is required for the same. We do not permit our pages to
              be loaded into frames on your site. Our Department's pages must load into a newly
              opened browser window of the user.
            </Typography>

            {/* Copyright Policy */}
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 4, mb: 2 }}>
              Copyright Policy
            </Typography>
            <Typography variant="subtitle2" paragraph>
              Material featured on this portal may be reproduced free of charge in any format or
              media without requiring specific permission. This is subject to the material being
              reproduced accurately and not being used in a derogatory manner or in a misleading
              context. Where the material is being published or issued to others, the source must be
              prominently acknowledged. However, the permission to reproduce this material does not
              extend to any material on this site which is identified as being the copyright of the
              third party. Authorization to reproduce such material is obtained from the copyright
              holders concerned.
            </Typography>
          </CardContent>
        </Box>
      </Container>
    </Box>
  );
}
