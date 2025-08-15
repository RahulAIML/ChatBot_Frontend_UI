import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Iconify } from '../iconify';

// Wrap the components with custom styling via props instead of styled API
const CustomAccordion = (props) => (
  <Accordion 
    disableGutters 
    elevation={0} 
    square 
    sx={{
      border: '1px solid rgba(0, 0, 0, .125)',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&::before': {
        display: 'none',
      },
      ...props.sx
    }}
    {...props}
  />
);

const CustomAccordionSummary = (props) => (
  <AccordionSummary
    expandIcon={<Iconify icon="mdi:chevron-right" width={18} height={18} />}
    sx={{
      backgroundColor: 'white',
      flexDirection: 'row-reverse',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
      '& .MuiAccordionSummary-content': {
        marginLeft: 1,
      },
      ...props.sx
    }}
    {...props}
  />
);

const CustomAccordionDetails = (props) => (
  <AccordionDetails
    sx={{
      padding: 2,
      borderTop: '1px solid rgba(0, 0, 0, .125)',
      backgroundColor: 'white',
      ...props.sx
    }}
    {...props}
  />
);

export { 
  CustomAccordion as Accordion, 
  CustomAccordionSummary as AccordionSummary, 
  CustomAccordionDetails as AccordionDetails 
};
