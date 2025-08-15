import { Box, Card, Typography, Slide } from '@mui/material';

// import Logo from '@/assets/edugen.png';
// import Flag from '@/assets/flag.png';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return 'I came from the About.tsx loader function!';
}

const Round3Notes = ({ data, userId }) => {
  return (
    <>
      <Card
        sx={{
          mt: 1,
          mb: 1,
          borderRadius: '10px',
          // backgroundColor: 'error.note',
          p: 2,
          border: '1px solid #808080',
        }}
      >
        {' '}
        <div class="instruction">
          <Typography variant="h6" mt={1} sx={{ textDecoration: 'underline' }}>
            Important Instructions for the Candidate: - (उमेदवारांसाठी महत्वाच्या सूचना)
          </Typography>

          <Box p={1}>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                1. Check the allotment made in the CAP Round III through candidate’s Login & Verify
                the correctness of the credentials used in seat allotment made to him/her in CAP
                round I as per the Rules & Regulations.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                2.After ensuring the correctness of the allotment, The candidate who have been
                allotted the seat first time in Round III shall pay the seat acceptance fee through
                his/her login by online mode.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                3. In later stage, if it is found that the seat allotted to the candidate on the
                false claims made in the application by the candidate, then such allotment/admission
                taken in the allotted institute shall be cancelled automatically.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                4. Reporting dates for admission in the allotted Institute{' '}
                {import.meta.env.VITE_CAP3_REPORTING_DATE} to 05.00 pm
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                5. if You did not get Betterment in CAP Round III. Your earlier allotment in CAP
                Round II is retained.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                6. It is mandatory for the candidate to report directly to the Allotted Institute
                for confirmation of admission.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                7. If such Candidate does not report to the allotted Institute within scheduled
                time, then his allotted seat shall be cancelled and the seat shall be available for
                Institute level admissions.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                8. There shall be no further betterment option available to the candidate after
                Round III The allotment made and/or allotment retained in Round III for
                participating candidates in Round III shall be final.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                9. It is mandatory for the candidate complete self-verification and seat acceptance
                and then report to the Allotted Institute for confirmation of admission.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                10. If such Candidate do not complete self-verification and seat acceptance and/or
                Report to the allotted Institute within scheduled time, then his allotted seat shall
                be cancelled and the seat shall be available for institute level admissions.
              </Typography>
            </Box>
          </Box>
        </div>
      </Card>
    </>
  );
};

export default Round3Notes;
