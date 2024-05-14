import React, {useState} from 'react'
import { Grid } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Panel({xs=12, title="Panel", children}) {

  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  return (
    <Grid item xs={xs}>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
      
          expandIcon={<ExpandMoreIcon sx={{color: "var(--element-active-color)"}} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <h2 style={{margin: "0px"}}>{title}</h2>
        </AccordionSummary>
        <AccordionDetails>
       
        {children}

        </AccordionDetails>
      </Accordion>
 
    </Grid>
  )
}
