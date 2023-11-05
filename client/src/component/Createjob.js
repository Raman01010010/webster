import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function CreateJob() {
  return (
    <Box
      sx={{
        py: 2,
        display: 'grid',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <TextField
        label="Type in here…"
        variant="outlined"
        color="primary"
        fullWidth
      />
      <TextField
        label="Type in here…"
        variant="outlined"
        color="info"
        fullWidth
      />
      <TextField
        label="Type in here…"
        variant="outlined"
        color="error"
        fullWidth
      />
      <TextField
        label="Type in here…"
        variant="outlined"
        color="success"
        fullWidth
      />
      <TextField
        label="Type in here…"
        variant="outlined"
        color="warning"
        fullWidth
      />
    </Box>
  );
}
