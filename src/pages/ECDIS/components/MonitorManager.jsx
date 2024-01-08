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
  Paper,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import EditIcon from "@mui/icons-material/Edit"
import SaveIcon from "@mui/icons-material/Save"
import AddIcon from "@mui/icons-material/Add"

function MonitorManager() {
  const [vessels, setVessels] = useState(() => JSON.parse(localStorage.getItem("vessels")) || {})
  const [mainDialogOpen, setMainDialogOpen] = useState(false)
  const [editVesselDialogOpen, setEditVesselDialogOpen] = useState(false)
  const [dataSourceDialogOpen, setDataSourceDialogOpen] = useState(false)
  const [currentVesselKey, setCurrentVesselKey] = useState(null)
  const [currentDataSource, setCurrentDataSource] = useState({ source: "mqtt", topic: "" })
  const [editingVesselName, setEditingVesselName] = useState("")
  const [editingDataSourceIndex, setEditingDataSourceIndex] = useState(null)

  useEffect(() => {
    localStorage.setItem("vessels", JSON.stringify(vessels))
  }, [vessels])

  const handleMainDialogToggle = () => {
    setMainDialogOpen(!mainDialogOpen)
  }

  const handleEditVesselDialogToggle = () => {
    setEditVesselDialogOpen(!editVesselDialogOpen)
    setEditingVesselName("")
    setCurrentVesselKey(null)
  }

  const handleDataSourceDialogToggle = () => {
    setDataSourceDialogOpen(!dataSourceDialogOpen)
    setCurrentDataSource({ source: "mqtt", topic: "" })
    setEditingDataSourceIndex(null)
  }

  const addOrEditVessel = () => {
    if (editingVesselName.trim()) {
      if (currentVesselKey) {
        // Editing existing vessel
        if (currentVesselKey !== editingVesselName) {
          const updatedVessels = { ...vessels, [editingVesselName]: vessels[currentVesselKey] }
          delete updatedVessels[currentVesselKey]
          setVessels(updatedVessels)
        }
      } else {
        // Adding new vessel
        setVessels({ ...vessels, [editingVesselName]: { dataSources: [] } })
      }
    }
    handleEditVesselDialogToggle()
  }

  const removeVessel = key => {
    const updatedVessels = { ...vessels }
    delete updatedVessels[key]
    setVessels(updatedVessels)
  }

  const editVessel = key => {
    setCurrentVesselKey(key)
    setEditingVesselName(key)
    setEditVesselDialogOpen(true)
  }

  const startAddDataSource = vesselKey => {
    setCurrentVesselKey(vesselKey)
    // Initialize currentDataSource with default values
    setCurrentDataSource({ source: "mqtt", topic: "" })
    setEditingDataSourceIndex(null)
    setDataSourceDialogOpen(true)
  }

  const addOrEditDataSource = () => {
    if (currentVesselKey) {
      const updatedDataSources = [...(vessels[currentVesselKey].dataSources || [])]
      if (editingDataSourceIndex !== null) {
        updatedDataSources[editingDataSourceIndex] = currentDataSource
      } else {
        updatedDataSources.push(currentDataSource)
      }
      const updatedVessels = { ...vessels, [currentVesselKey]: { ...vessels[currentVesselKey], dataSources: updatedDataSources } }
      setVessels(updatedVessels)
    }
    handleDataSourceDialogToggle()
  }

  const editDataSource = (vesselKey, index) => {
    setCurrentVesselKey(vesselKey)
    setCurrentDataSource(vessels[vesselKey].dataSources[index])
    setEditingDataSourceIndex(index)
    setDataSourceDialogOpen(true)
  }

  const removeDataSource = (vesselKey, index) => {
    const updatedDataSources = vessels[vesselKey].dataSources.filter((_, i) => i !== index)
    setVessels({ ...vessels, [vesselKey]: { ...vessels[vesselKey], dataSources: updatedDataSources } })
  }

  return (
    <div>
      <Button onClick={handleMainDialogToggle} variant="contained" color="primary">
        Manage Vessels
      </Button>

      {/* Main Dialog for Vessel Management */}
      <Dialog open={mainDialogOpen} onClose={handleMainDialogToggle} fullWidth maxWidth="md">
        <DialogTitle>Vessels</DialogTitle>
        <DialogContent>
          <List>
            {Object.entries(vessels).map(([key, vessel]) => (
              <ListItem key={key}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{key}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {vessel.dataSources.map((dataSource, index) => (
                        <Grid item xs={12} key={index}>
                          <Typography>
                            Source: {dataSource.source}, Topic: {dataSource.topic}
                          </Typography>
                          <IconButton onClick={() => editDataSource(key, index)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => removeDataSource(key, index)}>
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      ))}
                      <Grid item xs={12}>
                        <Button
                          onClick={() => startAddDataSource(key, null)}
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                        >
                          Add Data Source
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <IconButton onClick={() => editVessel(key)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => removeVessel(key)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <Button
            onClick={() => handleEditVesselDialogToggle()}
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px" }}
          >
            Add Vessel
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMainDialogToggle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Adding/Editing a Vessel */}
      <Dialog open={editVesselDialogOpen} onClose={handleEditVesselDialogToggle}>
        <DialogTitle>{currentVesselKey ? "Edit Vessel" : "Add Vessel"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Vessel Name"
            type="text"
            fullWidth
            value={editingVesselName}
            onChange={e => setEditingVesselName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditVesselDialogToggle} color="primary">
            Cancel
          </Button>
          <Button onClick={addOrEditVessel} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for Adding/Editing a Data Source */}
      <Dialog open={dataSourceDialogOpen} onClose={handleDataSourceDialogToggle}>
        <DialogTitle>{editingDataSourceIndex !== null ? "Edit Data Source" : "Add Data Source"}</DialogTitle>
        <DialogContent>
          <Paper style={{ padding: "20px" }}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Source</InputLabel>
              <Select
                value={currentDataSource.source}
                onChange={e => setCurrentDataSource({ ...currentDataSource, source: e.target.value })}
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
              onChange={e => setCurrentDataSource({ ...currentDataSource, topic: e.target.value })}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDataSourceDialogToggle} color="primary">
            Cancel
          </Button>
          <Button onClick={addOrEditDataSource} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MonitorManager

// function MonitorManager() {
//   const [vessels, setVessels] = useState(() => JSON.parse(localStorage.getItem("vessels")) || [])
//   const [vesselDialogOpen, setVesselDialogOpen] = useState(false)
//   const [newVesselName, setNewVesselName] = useState("")
//   const [dataSourceDialogOpen, setDataSourceDialogOpen] = useState(false)
//   const [currentVesselIndex, setCurrentVesselIndex] = useState(null)
//   const [currentDataSource, setCurrentDataSource] = useState({ source: "mqtt", topic: "" })
//   const [editingDataSourceIndex, setEditingDataSourceIndex] = useState(null)
//   const [editVesselDialogOpen, setEditVesselDialogOpen] = useState(false)
//   const [editVesselIndex, setEditVesselIndex] = useState(null)
//   const [editVesselName, setEditVesselName] = useState("")

//   useEffect(() => {
//     localStorage.setItem("vessels", JSON.stringify(vessels))
//   }, [vessels])

//   const handleVesselChange = (index, key, value) => {
//     const updatedVessels = [...vessels]
//     updatedVessels[index][key] = value
//     setVessels(updatedVessels)
//   }

//   const addVessel = () => {
//     setVesselDialogOpen(true)
//   }

//   const saveNewVessel = () => {
//     if (newVesselName.trim()) {
//       setVessels([...vessels, { identifier: newVesselName.trim(), dataSources: [] }])
//       setNewVesselName("")
//     }
//     setVesselDialogOpen(false)
//   }

//   const openEditVesselDialog = index => {
//     setEditVesselIndex(index)
//     setEditVesselName(vessels[index].identifier)
//     setEditVesselDialogOpen(true)
//   }

//   const handleEditVesselNameChange = event => {
//     setEditVesselName(event.target.value)
//   }

//   const saveEditedVessel = () => {
//     const updatedVessels = [...vessels]
//     updatedVessels[editVesselIndex].identifier = editVesselName
//     setVessels(updatedVessels)
//     setEditVesselDialogOpen(false)
//   }

//   const removeVessel = index => {
//     const updatedVessels = vessels.filter((_, i) => i !== index)
//     setVessels(updatedVessels)
//   }

//   const handleDataSourceDialogOpen = (vesselIndex, dataSourceIndex = null) => {
//     setCurrentVesselIndex(vesselIndex)
//     if (dataSourceIndex !== null) {
//       setCurrentDataSource({ ...vessels[vesselIndex].dataSources[dataSourceIndex] })
//       setEditingDataSourceIndex(dataSourceIndex)
//     } else {
//       setCurrentDataSource({ source: "mqtt", topic: "" })
//       setEditingDataSourceIndex(null)
//     }
//     setDataSourceDialogOpen(true)
//   }

//   const handleDataSourceDialogClose = () => {
//     setDataSourceDialogOpen(false)
//   }

//   const addDataSource = vesselIndex => {
//     setCurrentVesselIndex(vesselIndex)
//     setCurrentDataSource({ source: "mqtt", topic: "" })
//     setEditingDataSourceIndex(null)
//     setDataSourceDialogOpen(true)
//   }

//   const editDataSource = (vesselIndex, dataSourceIndex) => {
//     setCurrentVesselIndex(vesselIndex)
//     setCurrentDataSource({ ...vessels[vesselIndex].dataSources[dataSourceIndex] })
//     setEditingDataSourceIndex(dataSourceIndex)
//     setDataSourceDialogOpen(true)
//   }

//   const saveDataSource = () => {
//     const updatedVessels = [...vessels]
//     if (editingDataSourceIndex !== null) {
//       updatedVessels[currentVesselIndex].dataSources[editingDataSourceIndex] = currentDataSource
//     } else {
//       updatedVessels[currentVesselIndex].dataSources.push(currentDataSource)
//     }
//     setVessels(updatedVessels)
//     handleDataSourceDialogClose()
//   }

//   const removeDataSource = (vesselIndex, dataSourceIndex) => {
//     const updatedVessels = [...vessels]
//     updatedVessels[vesselIndex].dataSources = updatedVessels[vesselIndex].dataSources.filter((_, i) => i !== dataSourceIndex)
//     setVessels(updatedVessels)
//   }

//   return (
//     <div>
//       <Typography>Monitored vessels</Typography>
//       <List>
//         {vessels.map((vessel, vesselIndex) => (
//           <ListItem key={vesselIndex}>
//             <Accordion>
//               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                 <Typography>{vessel.identifier || "New Vessel"}</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Grid container spacing={2}>
//                   {vessel.dataSources.map((dataSource, dataSourceIndex) => (
//                     <Grid item xs={12} key={dataSourceIndex}>
//                       <Typography>
//                         Source: {dataSource.source}, Topic: {dataSource.topic}
//                       </Typography>
//                       <IconButton onClick={() => editDataSource(vesselIndex, dataSourceIndex)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton onClick={() => removeDataSource(vesselIndex, dataSourceIndex)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </Grid>
//                   ))}
//                   <Grid item xs={12}>
//                     <Button onClick={() => addDataSource(vesselIndex)} variant="contained">
//                       Add Data Source
//                     </Button>
//                   </Grid>
//                 </Grid>
//                 <IconButton onClick={() => openEditVesselDialog(vesselIndex)}>
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton onClick={() => removeVessel(vesselIndex)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </AccordionDetails>
//             </Accordion>
//           </ListItem>
//         ))}
//       </List>
//       <Button onClick={addVessel} variant="contained" color="primary">
//         Add Vessel
//       </Button>

// {/* Dialog for Adding a New Vessel */}
// <Dialog open={vesselDialogOpen} onClose={() => setVesselDialogOpen(false)} aria-labelledby="vessel-dialog-title">
//   <DialogTitle id="vessel-dialog-title">Add New Vessel</DialogTitle>
//   <DialogContent>
//     <TextField
//       autoFocus
//       margin="normal"
//       label="Vessel Identifier"
//       fullWidth
//       value={newVesselName}
//       onChange={e => setNewVesselName(e.target.value)}
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setVesselDialogOpen(false)} color="primary">
//       Cancel
//     </Button>
//     <Button onClick={saveNewVessel} color="primary">
//       Save
//     </Button>
//   </DialogActions>
// </Dialog>

// {/* Edit Vessel Name Dialog */}
// <Dialog open={editVesselDialogOpen} onClose={() => setEditVesselDialogOpen(false)}>
//   <DialogTitle>Edit Vessel Name</DialogTitle>
//   <DialogContent>
//     <TextField
//       autoFocus
//       margin="dense"
//       label="Vessel Name"
//       type="text"
//       fullWidth
//       value={editVesselName}
//       onChange={handleEditVesselNameChange}
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setEditVesselDialogOpen(false)} color="primary">
//       Cancel
//     </Button>
//     <Button onClick={saveEditedVessel} color="primary">
//       Save
//     </Button>
//   </DialogActions>
// </Dialog>

// {/* Dialog for Editing Data Sources */}
// <Dialog open={dataSourceDialogOpen} onClose={handleDataSourceDialogClose} aria-labelledby="data-source-dialog-title">
//   <DialogTitle id="data-source-dialog-title">Data Source</DialogTitle>
//   <DialogContent>
//     <FormControl fullWidth margin="normal">
//       <InputLabel>Source</InputLabel>
//       <Select
//         value={currentDataSource.source}
//         onChange={e => setCurrentDataSource({ ...currentDataSource, source: e.target.value })}
//       >
//         <MenuItem value="mqtt">MQTT</MenuItem>
//         <MenuItem value="zenoh">Zenoh</MenuItem>
//       </Select>
//     </FormControl>
//     <TextField
//       fullWidth
//       margin="normal"
//       label="Topic"
//       value={currentDataSource.topic}
//       onChange={e => setCurrentDataSource({ ...currentDataSource, topic: e.target.value })}
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleDataSourceDialogClose} color="primary">
//       Cancel
//     </Button>
//     <Button onClick={saveDataSource} color="primary">
//       Save
//     </Button>
//   </DialogActions>
// </Dialog>
//     </div>
//   )
// }

// export default MonitorManager
