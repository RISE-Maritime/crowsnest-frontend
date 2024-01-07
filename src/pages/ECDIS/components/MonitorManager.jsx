import React, { useState, useEffect } from "react"
import {
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import SaveIcon from "@mui/icons-material/Save"
import EditIcon from "@mui/icons-material/Edit"
function MonitorManager() {
  const [vessels, setVessels] = useState(() => JSON.parse(localStorage.getItem("vessels")) || [])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentVesselIndex, setCurrentVesselIndex] = useState(null)
  const [currentDataSource, setCurrentDataSource] = useState({ source: "mqtt", topic: "" })
  const [editingDataSourceIndex, setEditingDataSourceIndex] = useState(null)

  useEffect(() => {
    localStorage.setItem("vessels", JSON.stringify(vessels))
  }, [vessels])

  const handleVesselChange = (index, key, value) => {
    const updatedVessels = [...vessels]
    updatedVessels[index][key] = value
    setVessels(updatedVessels)
  }

  const handleDataSourceChange = dataSource => {
    setCurrentDataSource(dataSource)
  }

  const addVessel = () => {
    setVessels([...vessels, { identifier: "", dataSources: [] }])
  }

  const removeVessel = index => {
    const updatedVessels = vessels.filter((_, i) => i !== index)
    setVessels(updatedVessels)
  }

  const addDataSource = vesselIndex => {
    setCurrentVesselIndex(vesselIndex)
    setCurrentDataSource({ source: "mqtt", topic: "" })
    setEditingDataSourceIndex(null)
    setDialogOpen(true)
  }

  const editDataSource = (vesselIndex, dataSourceIndex) => {
    setCurrentVesselIndex(vesselIndex)
    setCurrentDataSource({ ...vessels[vesselIndex].dataSources[dataSourceIndex] })
    setEditingDataSourceIndex(dataSourceIndex)
    setDialogOpen(true)
  }

  const saveDataSource = () => {
    const updatedVessels = [...vessels]
    if (editingDataSourceIndex !== null) {
      updatedVessels[currentVesselIndex].dataSources[editingDataSourceIndex] = currentDataSource
    } else {
      updatedVessels[currentVesselIndex].dataSources.push(currentDataSource)
    }
    setVessels(updatedVessels)
    setDialogOpen(false)
  }

  const removeDataSource = (vesselIndex, dataSourceIndex) => {
    const updatedVessels = [...vessels]
    updatedVessels[vesselIndex].dataSources = updatedVessels[vesselIndex].dataSources.filter((_, i) => i !== dataSourceIndex)
    setVessels(updatedVessels)
  }

  return (
    <div>
      <Button onClick={addVessel} variant="contained" color="primary">
        Add Vessel
      </Button>
      <List>
        {vessels.map((vessel, vesselIndex) => (
          <ListItem key={vesselIndex}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{vessel.identifier || "New Vessel"}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Vessel Identifier"
                      value={vessel.identifier}
                      onChange={e => handleVesselChange(vesselIndex, "identifier", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  {vessel.dataSources.map((dataSource, dataSourceIndex) => (
                    <Grid item xs={12} key={dataSourceIndex}>
                      <Typography>
                        Source: {dataSource.source}, Topic: {dataSource.topic}
                      </Typography>
                      <IconButton onClick={() => editDataSource(vesselIndex, dataSourceIndex)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => removeDataSource(vesselIndex, dataSourceIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button onClick={() => addDataSource(vesselIndex)} variant="contained">
                      Add Data Source
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <IconButton onClick={() => removeVessel(vesselIndex)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Data Source</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Source</InputLabel>
            <Select
              value={currentDataSource.source}
              onChange={e => handleDataSourceChange({ ...currentDataSource, source: e.target.value })}
            >
              <MenuItem value="mqtt">MQTT</MenuItem>
              <MenuItem value="zenoh">Zenoh</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Topic"
            value={currentDataSource.topic}
            onChange={e => handleDataSourceChange({ ...currentDataSource, topic: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={saveDataSource} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MonitorManager
