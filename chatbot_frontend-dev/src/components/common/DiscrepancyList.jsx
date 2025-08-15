import React from 'react';
import {
  Grid,
  Typography,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import moment from 'moment';
import { NotesCard } from '../notes/NotesCard';

const Title = ({ data }) => {
  return (
    <NotesCard>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>

                  <TableCell>Discrepancy Name</TableCell>
                  <TableCell>{import.meta.env.VITE_FC_NAME} Remark</TableCell>
                  <TableCell>Marked on</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((e, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <strong>{index + 1}.</strong>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">{e.name}</Typography>
                    </TableCell>
                    <TableCell>
                      {' '}
                      <Typography variant="subtitle2">{e.remark}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="subtitle2">
                        {moment(e.createdOn).format('DD/MM/YYYY hh.mm.ss A')}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </NotesCard>
  );
};

export default Title;
