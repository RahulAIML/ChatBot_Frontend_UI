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

const Round2Notes = ({ data, userId }) => {
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
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
            <Typography variant="h6" mt={1}>
              1. The SC, ST, VJ/DT- NT(A), NT(B), NT(C), NT(D), OBC, SBC and EWS Candidates who
              submitted receipt of Caste/Tribe Validity Certificate, Non Creamy Layer Certificate,
              EWS Certificate during registration, physical document verification and confirmation
              period should upload and verify original Caste/ Tribe Validity Certificate, Non Creamy
              Layer Certificate, EWS Certificate at Scrutiny Center and submit original certificate
              to the admitted institute on or before{' '}
              {import.meta.env.VITE_LAST_DATE_SUBMIT_CERTIFICATE} to the allotted institute Up to
              3.00 PM otherwise these candidates admission will get automatically cancelled and
              shall be considered as Open category candidates for next institute level round
              provided candidate full fill eligibility criteria for open category.
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
            <Typography variant="h6" mt={1}>
              2. SEBC Candidates who submitted receipt of Non Creamy Layer certificate during
              registration, e-verification or physical document verification and confirmation period
              should upload and verify original Non Creamy Layer Certificate at Physical Scrutiny
              Center or E-Scrutiny Center and submit original certificate to the admitted institute
              on or before {import.meta.env.VITE_LAST_DATE_SUBMIT_CERTIFICATE} otherwise these
              candidates admission will get automatically cancelled and shall be considered as Open
              category candidates for next institute level round provided candidate full fill
              eligibility criteria for open category.
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
            <Typography variant="h6" mt={1}>
              3. In case of SEBC Candidates, duration for submitting Caste Validity certificate will
              be as per the Maharashtra State Government Resolution No - संकिर्ण-2024/प्र.क्र.75/
              आरक्षण -5 dated 22 July 2024.
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
            <Typography variant="h6" mt={1}>
              4. For PWD Candidates, Disability nature must be permanent and a 40% benchmark is
              required, according to the rule. If you have submitted the wrong document and it has
              been verified by SC, your admission will be cancelled.
            </Typography>
          </Box>
          <Box display={'flex'}>
            <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
            <Typography variant="h6" mt={1}>
              5. Candidates must submit their qualifying exam marksheet, clearly indicating that
              they meet the eligibility criteria, at the time of admission to the respective
              institute.
            </Typography>
          </Box>
          <Box p={1}>
            <Box display={'flex'}>
              <Typography variant="subtitle2" mt={1} component={'span'}></Typography>
              <Typography variant="subtitle2" mt={1}>
                1. Check the allotment made in the CAP Round I through candidate’s Login & Verify
                the correctness of the credentials used in seat allotment made to him/her in CAP
                round II as per the Rules & Regulations.
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
                {import.meta.env.VITE_CAP2_REPORTING_DATE}
                up to 05.00 pm.
              </Typography>
            </Box>
          </Box>
        </div>
      </Card>
    </>
  );
};

export default Round2Notes;
