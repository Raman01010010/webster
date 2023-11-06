import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip'; // Import the Chip component

const skillsList = [
  'HTML',
  'CSS',
  'JavaScript',
  'Java',
  'C++',
  'Kotlin',
  // Add more skills here
];

export default function PaymentForm() {
  const [selectedSkills, setSelectedSkills] = React.useState([]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={skillsList}
          getOptionLabel={(option) => option}
          value={selectedSkills}
          onChange={(event, newValue) => {
            setSelectedSkills(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Skills Required"
              placeholder="Add more Skills"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                size="small"
                color="primary" // Change the color to blue
                {...getTagProps({ index })}
              />
            ))
          }
        />
      </Grid>
    </React.Fragment>
  );
}
