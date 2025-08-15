import { Slide } from '@mui/material';

import Logo from 'src/assets/icons/edugen.png';
import Flag from 'src/assets/icons/araloggo.png';
import React from 'react';

import moment from 'moment';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export async function loader() {
  await new Promise((r) => setTimeout(r, 500));
  return 'I came from the About.tsx loader function!';
}
function roundName(round) {
  switch (round) {
    case '1':
      return 'I';
    case '2':
      return 'II';
    case '3':
      return 'III';
    case '4':
      return 'IV';
    default:
      return '';
  }
}

function roundDate(round) {
  switch (round) {
    case '1':
      return import.meta.env.VITE_ALLOT_DATE_R1;
    case '2':
      return import.meta.env.VITE_ALLOT_DATE_R2;
    case '3':
      return import.meta.env.VITE_ALLOT_DATE_R3;
    case '4':
      return import.meta.env.VITE_ALLOT_DATE_R4;
    default:
      return '';
  }
}
const AllotmentPrint = ({ data, round }) => {
  return (
    <>
      <div>
        <table width="100%" class="print_header">
          <tr>
            <div class="print-button">
              {/* <h6>Helpline Numbers : 8956007189 / 8530814843 (09.00 a.m. to 07.00 p.m.)</h6> */}
            </div>
            <td width="15%" align="left">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img style={{ marginBottom: '4px', width: '90px' }} src={Logo} />
              </div>
            </td>
            <td width="70%" align="center">
              <strong>
                GOVERNMENT OF MAHARASHTRA
                <br />
                State Common Entrance Test Cell, Maharashtra State, Mumbai
                <br /> 8th Floor, New Excelsior Building, A.K. Nayak Marg,Fort,Mumbai-400001.(M.S.)
                <br />
                Provisional Allotment CAP ROUND {roundName(round)} for{' '}
                {import.meta.env.VITE_COURSE_NAME} for the year {import.meta.env.VITE_CURRENT_YEAR}
                <br />
                Published On: {roundDate(round)}
              </strong>{' '}
            </td>
            <td width="15%" align="right">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img style={{ marginBottom: '4px', width: '90px' }} src={Flag} />
              </div>
            </td>
          </tr>
        </table>
        <div style={{ padding: '1px', fontSize: '14px' }}>
          <table
            width="100%"
            border="1"
            cellspacing="0"
            cellpadding="5"
            style={{ borderCollapse: 'collapse', width: '100%' }}
          >
            <tr>
              <td width="50%" align="center">
                Application ID :{' '}
                <strong>
                  {import.meta.env.VITE_PREFIX}
                  {data?.fcConfirmdata?.user_id}
                </strong>
              </td>
            </tr>
            {/* <tr>
              <td colspan="2" align="center">
                Mode Of Qualification :
                <strong>
                  {Number(data?.fcConfirmdata?.diplomamarksobt) > 0 ? ' Diploma' : ' Others'}
                </strong>
              </td>
            </tr> */}
          </table>
          <table
            border="1"
            cellspacing="0"
            cellpadding="5"
            style={{ borderCollapse: 'collapse', width: '100%' }}
          >
            <tr>
              <th
                colspan="8"
                align="left"
                style={{
                  textAlign: 'center',
                  marginTop: '1%',
                  background: 'darkgray',
                }}
              >
                <strong>Personal Details </strong>{' '}
              </th>
            </tr>
          </table>
          <table
            border="1"
            cellspacing="0"
            cellpadding="5"
            style={{ borderCollapse: 'collapse', width: '100%' }}
          >
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <td width="10%">Full Name</td>
              <td width="68%" colspan="3">
                <strong>{data?.fcConfirmdata?.full_name}</strong>{' '}
              </td>
            </tr>
            <tr>
              <td>Type of Candidature</td>
              <td width="68%" colspan="3">
                <strong>{data?.fcConfirmdata?.master_candidature_type_name} </strong>
              </td>
            </tr>
            <tr>
              <td width="10%"> Gender</td>
              <td width="15%">
                <strong> {data?.fcConfirmdata?.gender} </strong>{' '}
              </td>
              <td width="10%">Date of Birth (DD-MM-YYYY)</td>
              <td width="10%" colspan="2">
                <strong> {data?.fcConfirmdata?.dob} </strong>
              </td>
            </tr>
            <tr>
              <td> Candidate Category</td>
              <td>
                <strong>{data?.meritdata?.CandidateEnteredCategory}</strong>
              </td>
              <td>Admission Category</td>
              <td>
                {' '}
                <strong>{data?.fcConfirmdata?.category_name} </strong>
              </td>
            </tr>
            <tr>
              <td> PWD Type</td>
              <td>
                <strong>{data?.fcConfirmdata?.physical_disbility_type_name}</strong>
              </td>
              <td> EWS</td>
              <td>
                <strong>{data?.fcConfirmdata?.ews} </strong>
              </td>
            </tr>

            <tr>
              <td> Religious Minority</td>
              <td>
                <strong>{data?.fcConfirmdata?.religious_type_name}</strong>
              </td>
              <td> Linguistic Minority</td>
              <td>
                <strong>{data?.fcConfirmdata?.linguistic_type_name} </strong>
              </td>
            </tr>

            <tr>
              <td> TFWS</td>
              <td>
                <strong>{data?.fcConfirmdata?.istfws}</strong>
              </td>
              <td> Home University</td>
              <td>
                <strong>{data?.fcConfirmdata?.home_university}</strong>
              </td>
            </tr>
            <tr>
              <td> Orphan</td>
              <td>
                <strong>{data?.fcConfirmdata?.orphan}</strong>
              </td>
              <td> Defence</td>
              <td>
                <strong>{data?.fcConfirmdata?.defence}</strong>
              </td>
            </tr>
          </table>
          <br />

          <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tr>
              <th
                colspan="8"
                align="left"
                style={{
                  textAlign: 'center',
                  marginTop: '1%',
                  background: 'darkgray',
                }}
              >
                <strong>Final Merit Details </strong>{' '}
              </th>
            </tr>

            {data?.meritdata?.slgmn == 0 ? (
              <>
                <tr>
                  <td>All India Merit No.</td>
                  <td colspan="4" style={{ fontWeight: 'bold' }}>
                    {data?.meritdata?.sl_ai_gmn}
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <td>State Level General Merit No.</td>
                <td colspan="4" style={{ fontWeight: 'bold' }}>
                  {data?.meritdata?.slgmn}
                </td>
              </tr>
            )}

            {data?.meritdata?.slcgmn > 0 && (
              <tr>
                <td align="left" width="40%">
                  State Level Category General Merit No.
                </td>
                <td align="left" width="60%" style={{ fontWeight: 'bold' }}>
                  {data?.meritdata?.slcgmn} [{data?.meritdata?.ArcCategory}]
                </td>
              </tr>
            )}

            {data?.meritdata?.slfgmn > 0 && (
              <tr>
                <td>State Level Female General Merit No.</td>
                <td colspan="4" style={{ fontWeight: 'bold' }}>
                  {data?.meritdata?.slfgmn}
                </td>
              </tr>
            )}

            {data?.meritdata?.sl_ews_gmn > 0 && (
              <tr>
                <td align="left" width="40%">
                  State Level EWS General Merit No.
                </td>
                <td align="left" width="60%" style={{ fontWeight: 'bold' }}>
                  {data?.meritdata?.sl_ews_gmn}
                </td>
              </tr>
            )}
            {data?.meritdata?.slphmn > 0 && (
              <tr>
                <td align="left" width="40%">
                  State Level PWD General Merit No.
                </td>
                <td align="left" width="60%" style={{ fontWeight: 'bold' }}>
                  <strong>{data?.meritdata?.slphmn}</strong>
                </td>
              </tr>
            )}

            {data?.meritdata?.slgdmn > 0 && (
              <tr>
                <td align="left" width="40%">
                  State Level Defence General Merit No.
                </td>
                <td align="left" width="60%" style={{ fontWeight: 'bold' }}>
                  <strong>{data?.meritdata?.slgdmn}</strong>
                </td>
              </tr>
            )}
            {data?.meritdata?.sl_tfws_gmn > 0 && (
              <tr>
                <td align="left" width="40%">
                  State Level TFWS General Merit No.
                </td>
                <td align="left" width="60%" style={{ fontWeight: 'bold' }}>
                  {data?.meritdata?.sl_tfws_gmn}
                </td>
              </tr>
            )}
          </table>
          <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tr>
              <th
                colspan="2"
                align="left"
                style={{
                  textAlign: 'center',
                  margin: '2%',
                  background: 'darkgray',
                }}
              >
                Status of Provisional Allotment Details for CAP ROUND - {roundName(round)}
              </th>
            </tr>

            <tr>
              <td>
                Choice Code Allotted{' '}
                {/* {round > 1 && (
									<strong>[{data?.allotmentData?.BettermentStatus}]</strong>
								)} */}
              </td>
              <td style={{ fontWeight: 'bold' }}>
                {data?.allotmentData?.choicecode} - {data?.instituteDetails?.course_name}
              </td>
            </tr>

            <tr>
              <td>Institute Allotted</td>
              <td style={{ fontWeight: 'bold' }}>
                {data?.instituteDetails?.institute_id} - {data?.instituteDetails?.inst_name}
              </td>
            </tr>
            <tr>
              <td>Seat Type Alloted</td>
              <td style={{ fontWeight: 'bold' }}>
                <strong>{data?.allotmentData?.seattype}</strong>
              </td>
            </tr>
            <tr>
              <td>Preference No. Alloted</td>
              <td style={{ fontWeight: 'bold' }}>
                <strong> {data?.allotmentData?.pref_no}</strong>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllotmentPrint;
