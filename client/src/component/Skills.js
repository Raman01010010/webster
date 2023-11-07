import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import { useContext } from 'react';
import { User } from '../context/User';
const skillsList = [
  'HTML',
  'CSS',
  'JavaScript',
  'Java',
  'C++',
  'Kotlin',
  // Add more skills here
];

export default function Skills() {
  // const [selectedSkills, setSelectedSkills] = React.useState([]);
  const {comp,setComp}=useContext(User)
  console.log(comp)

  

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        <Autocomplete
          multiple
          id="size-small-standard-multi"
          size="small"
          options={skillsList}
          value={comp.skill}
          onChange={(event, newValue) => {
           // setSelectedSkills(newValue);
            setComp(old=>{
              return({
                ...old,
                "skill":[...newValue]
              })
            })
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
                color="primary"
                {...getTagProps({ index })}
              />
            ))
          }
        />
      </Grid>
    </React.Fragment>
  );
}
