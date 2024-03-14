import React, { useState, useEffect, useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import FB from "../../../FirebaseMy"
import CloseRoundedIcon from "@material-ui/icons/CloseRounded"
import MyContext from "../../../context/MyContext"
import axios from "axios"
import { DateTimePicker } from "@material-ui/pickers"
import PropTypes from "prop-types"
import {
  Grid,
  DialogContent,
  // Button,
  Dialog,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Fab,
} from "@material-ui/core"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"

const useStyles = makeStyles({
  gridContainer: {},
  contentBox: {
    position: "relative",
  },
  buttonClose: {
    position: "absolute",
    top: "0.8rem",
    right: "0.8rem",
  },
  textCenter: {
    textAlign: "center",
  },
  itemCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  formControl: {
    width: "100%",
  },
  itemDateTime: {
    width: "99%",
  },
  multilineText: {
    width: "100%",
  },
  buttonReport: {
    width: 300,
    height: 50,
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    "&:hover": {
      backgroundColor: "rgba(255, 0, 0, 0.7)",
    },
  },
  buttonReportText: {
    margin: "0px",
  },
  red: {
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    "&:hover": {
      backgroundColor: "rgba(255, 0, 0, 0.7)",
    },
  },
  yellow: {
    backgroundColor: "rgba(245, 215, 66, 0.3)",
    "&:hover": {
      backgroundColor: "rgba(245, 215, 66, 0.7)",
    },
  },
  blue: {
    backgroundColor: "rgba(33, 101, 143, 0.3)",
    "&:hover": {
      backgroundColor: "rgba(33, 101, 143, 0.7)",
    },
  },
  eventReportedText: {
    color: "#2B6C3C",
  },
})

export default function SimpleDialog({ handleClose, open }) {
  const classes = useStyles()
  const context = useContext(MyContext)
  let db = FB.firestore()

  const [groupType, setGroupType] = useState("")
  const [groupTypeLevel1, setGroupTypeLevel1] = useState("")
  const [groupTypeLevel1List, setGroupTypeLevel1List] = useState([])
  const [groupTypeLevel2, setGroupTypeLevel2] = useState("")
  const [groupTypeLevel2List, setGroupTypeLevel2List] = useState([])
  const [groupTypeLevel3, setGroupTypeLevel3] = useState("")
  const [groupTypeLevel3List, setGroupTypeLevel3List] = useState([])
  const [eventPriority, setEventPriority] = useState("")
  const [selectedDate, handleDateChange] = useState(null)
  const [selectedDateUpdate, handleDateUpdateChange] = useState(null)
  const [multilineText, setMultilineText] = useState("")

  const [eventSentMsg, setEventSentMsg] = useState("")

  // Component render get TRV reason codes
  useEffect(() => {
    context.getReasonCodes()
  }, [])

  // Push event report
  const sendRaport = () => {
    // Send event to FB
    db.collection("event_reports")
      .add({
        groupType: groupType,
        groupTypeLevel1: groupTypeLevel1,
        groupTypeLevel2: groupTypeLevel2,
        groupTypeLevel3: groupTypeLevel3,
        eventPriority: eventPriority,
        selectedDate: selectedDate,
        selectedDateUpdate: selectedDateUpdate,
        multilineText: multilineText,
      })
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id)
        setGroupType("")
        setGroupTypeLevel1("")
        setGroupTypeLevel1List([])
        setGroupTypeLevel2("")
        setGroupTypeLevel2List([])
        setGroupTypeLevel3("")
        setGroupTypeLevel3List([])
        setEventPriority("")
        handleDateChange(null)
        handleDateUpdateChange(null)
        setMultilineText("")
      })
      .catch(error => {
        console.error("Error adding document: ", error)
      })

    // Send event to Kafka
    axios
      .post("http://127.0.0.1:8000/events_out_of_the_ordinary", {
        groupType: groupType,
        groupTypeLevel1: groupTypeLevel1,
        groupTypeLevel2: groupTypeLevel2,
        groupTypeLevel3: groupTypeLevel3,
        eventPriority: eventPriority,
        selectedDate: selectedDate,
        selectedDateUpdate: selectedDateUpdate,
        multilineText: multilineText,
      })
      .then(function (response) {
        // handle success
        console.log(response)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .then(function () {
        // always executed
      })

    setEventSentMsg("Händelsen rapporterad!")
  }

  const groupTypeChanged = value => {
    setGroupType(value)
    let newArray = context.reasonCodes.filter(function (obj) {
      return obj.GroupDescription == value
    })
    let unique = [...new Set(newArray.map(item => item.Level1Description))]
    setGroupTypeLevel1List(unique)
  }

  const groupTypeLevel1Changed = value => {
    setGroupTypeLevel1(value)
    let newArray = context.reasonCodes.filter(function (obj) {
      return obj.GroupDescription == groupType && obj.Level1Description == value
    })
    let unique = [...new Set(newArray.map(item => item.Level2Description))]
    setGroupTypeLevel2List(unique)
  }

  const groupTypeLevel2Changed = value => {
    setGroupTypeLevel2(value)
    let newArray = context.reasonCodes.filter(function (obj) {
      return obj.GroupDescription == groupType && obj.Level1Description == groupTypeLevel1 && obj.Level2Description == value
    })
    let unique = [...new Set(newArray.map(item => item.Level3Description))]
    setGroupTypeLevel3List(unique)
  }

  const creatNewRapport = () => {
    setEventSentMsg("")
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogContent className={classes.contentBox}>
        <Fab aria-label="like" className={classes.buttonClose} color="primary" onClick={handleClose}>
          <CloseRoundedIcon fontSize="large" />
        </Fab>

        {eventSentMsg != "" ? (
          <>
            <Grid container className={classes.gridContainer} spacing={2}>
              <Grid item xs={12} className={classes.itemCenter}>
                <h1 className={classes.eventReportedText}>{eventSentMsg}</h1>
              </Grid>
              <Grid item xs={12} className={classes.itemCenter}>
                <Button onClick={creatNewRapport}>Skapa en ny event rapport</Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container className={classes.gridContainer} spacing={2}>
            <Grid item xs={12}>
              <h1 className={classes.textCenter}>Händelse rapport</h1>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">(1) Grupp</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={groupType}
                  onChange={event => groupTypeChanged(event.target.value)}
                  label="(1) Grupp"
                >
                  <MenuItem value="Annonseringstexter">Annonseringstexter</MenuItem>
                  <MenuItem value="Orsaker nya principer">Orsaker nya principer</MenuItem>
                  <MenuItem value="Annat">Annat</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {groupType == "Annat" ? (
              <></>
            ) : (
              <>
                <Grid item xs={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">(2) Orsak nivå 1</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={groupTypeLevel1}
                      onChange={event => groupTypeLevel1Changed(event.target.value)}
                      label="(2) Orsak nivå 1"
                    >
                      {groupTypeLevel1List.map(item => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">(3) Orsak nivå 2</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={groupTypeLevel2}
                      onChange={event => groupTypeLevel2Changed(event.target.value)}
                      label="(3) Orsak nivå 2"
                    >
                      {groupTypeLevel2List.map(item => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">(4) Orsak nivå 3</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={groupTypeLevel3}
                      onChange={event => setGroupTypeLevel3(event.target.value)}
                      label="(4) Orsak nivå 3"
                    >
                      {groupTypeLevel3List.map(item => {
                        return (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Prioritet</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={eventPriority}
                  onChange={event => setEventPriority(event.target.value)}
                  label="Prioritet"
                >
                  <MenuItem className={classes.red} value="high">
                    Hög
                  </MenuItem>
                  <MenuItem className={classes.yellow} value="medium">
                    Medel
                  </MenuItem>
                  <MenuItem className={classes.blue} value="low">
                    Låg
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} className={classes.itemCenter}>
              <DateTimePicker
                className={classes.itemDateTime}
                inputVariant="outlined"
                ampm={false}
                label="Tidsesimat åtgärdat"
                disablePast
                format="yyyy-MM-dd HH:mm"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Grid>

            <Grid item xs={6}>
              <DateTimePicker
                className={classes.itemDateTime}
                inputVariant="outlined"
                ampm={false}
                label="Status uppdatering"
                disablePast
                format="yyyy-MM-dd HH:mm"
                value={selectedDateUpdate}
                onChange={handleDateUpdateChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className={classes.multilineText}
                variant="outlined"
                label="Fri text"
                multiline
                rows={4}
                rowsMax={5}
                defaultValue=""
                value={multilineText}
                onChange={event => setMultilineText(event.target.value)}
              />
            </Grid>

            <Grid item xs={12} className={classes.itemCenter}>
              <Button className={classes.buttonReport} onClick={sendRaport}>
                <h2 className={classes.buttonReportText}>Rapportera</h2>
              </Button>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}
