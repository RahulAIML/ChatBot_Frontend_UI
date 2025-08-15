import { Card, Box } from '@mui/material';
import { EmptyContent } from 'src/components/empty-content';
import React from 'react';
import Container from '@mui/material/Container';

import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
export function DataGridComponent({ data, columns, isLoading, rowId, rowHeight }) {
  return (
    <Card sx={{ mt: 2 }} key={'card'}>
      <DataGrid
        key={'table'}
        getRowId={(item) => `${item?.[rowId]}`}
        rows={data}
        columns={columns}
        loading={isLoading}
        getRowHeight={() => rowHeight ?? 40}
        autoHeight={true}
        pageSizeOptions={[10, 50, 100]}
        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        slots={{
          toolbar: GridToolbar,
          noRowsOverlay: () => <EmptyContent />,
          noResultsOverlay: () => <EmptyContent title="No results found" />,
        }}
        slotProps={{
          toolbar: {
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
          },
        }}
      />
    </Card>
  );
}
