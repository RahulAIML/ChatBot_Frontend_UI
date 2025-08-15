import { Box, Card, Typography, Slide } from '@mui/material';

// import Logo from '@/assets/edugen.png';
// import Flag from '@/assets/flag.png';
import React from 'react';

// import moment from 'moment';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return 'I came from the About.tsx loader function!';
}

const Round1Notes = ({ data, userId }) => {
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
                1. Check the allotment made in the CAP Round I through candidate’s Login & Verify
                the correctness of the credentials used in seat allotment made to him/her in CAP
                round I as per the Rules & Regulations.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                2. Candidate shall ensure through login that his/her claims related with Qualifying
                Marks, category, gender, reservation, special reservation made by himself/herself in
                the applications form are correct and the relevant documents uploaded to
                substantiate his/her claims are authentic and correct.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                3. After ensuring the correctness of the allotment, candidates shall pay the seat
                acceptance fee through online mode for the purpose of accepting the allotted seat.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                4. Allotment is made to the candidate based on the claims made by him/her in the
                applications form. If candidate found that the claim made by him is not correct
                during self-verification of the allotment, and if he wants to correct the
                error/discrepancy, the candidate has to report the grievance At Scrutiny Center
                without fail
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                5. In later stage, if it is found that the seat allotted to the candidate on the
                false claims made in the application by the candidate, then such allotment/admission
                taken in the allotted institute shall be cancelled automatically
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                6. Reporting dates for admission in the allotted Institute{' '}
                {import.meta.env.VITE_CAP1_REPORTING_DATE} up to 05.00 pm.
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                7. If a candidate is allotted the seat as per his first preference, such allotment
                shall be auto freezed and the candidate shall accept the allotment so made. Such
                candidates shall be not eligible for participation in the subsequent CAP rounds.
                Thereafter such candidates shall report to the allotted institute and seek admission
                on the allotted seat. If such candidate does not follow the instructions , their
                claim on the allotted seat shall stand forfeited automatically and the seat shall
                become available for fresh allotment. For such candidate, the allotment so made
                shall be the final allotment;
              </Typography>
            </Box>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                8. Seat acceptance dates for him/her in the allotted Institute{' '}
                {import.meta.env.VITE_CAP1_REPORTING_DATE}
                up to 05.00 pm.
              </Typography>
            </Box>
          </Box>
        </div>
      </Card>
    </>
  );
};

export default Round1Notes;
