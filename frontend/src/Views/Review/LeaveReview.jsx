import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import axios from 'axios'
import { useSelector } from 'react-redux'
import useAuth from '../../hooks/useAuth'
import { userSelector } from '../../store/slices/userSlice'

export default function LeaveReview() {
  const { isLoading, isAuth } = useAuth()
  const { id } = useSelector(userSelector)

  const navigate = useNavigate()
  const [buildings, setBuildings] = useState([])
  const [rooms, setRooms] = useState([])
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(1)
  const [buildingIndex, setBuildingIndex] = useState('')
  const [roomIndex, setRoomIndex] = useState('')
  const [newRoom, setNewRoom] = useState('')

  // Load all the buildings
  const loadBuildings = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: `/building`,
        withCredentials: true,
      })
      setBuildings(res.data.items)
    } catch (e) {
      console.error(e)
    }
  }

  // Load the rooms for a building
  const loadRooms = async () => {
    if (buildingIndex === '') return
    try {
      const res = await axios({
        method: 'post',
        url: `/room/query`,
        data: {
          building: buildings[parseInt(buildingIndex)],
        },
        withCredentials: true,
      })
      setRooms(res.data.items)
    } catch (e) {
      console.error(e)
    }
  }

  // Leave a review
  const leaveReview = async (e) => {
    e.preventDefault()
    if (!roomIndex || (roomIndex === 'New Room' && !newRoom)) return

    try {
      const data = {
        building: buildings[parseInt(buildingIndex)]._id,
        review: reviewText,
        rating,
        author: id,
      }

      if (roomIndex === '-1') {
        data.room = newRoom
        data.newRoom = true
      } else data.room = rooms[parseInt(roomIndex)]._id

      console.log(data)
      const res = await axios({
        method: 'post',
        url: `/review`,
        data,
        withCredentials: true,
      })
      navigate('/', { replace: true })
    } catch (err) {
      window.alert(err.message)
      console.error(err)
    }
  }

  // Handle building getting selected
  const buildingSelectChange = (e) => {
    setBuildingIndex(e.target.value)
  }

  // Handle room getting selected
  const roomSelectChange = (e) => {
    setRoomIndex(e.target.value)
  }

  // Handle review text getting changed
  const reviewTextChange = (e) => {
    setReviewText(e.target.value)
  }

  // Handle rating getting changed
  const ratingChange = (e, value) => {
    setRating(value)
  }

  // Load the buildings list on load
  useEffect(() => {
    loadBuildings()
  }, [])

  // Load the rooms for a building when selected
  useEffect(() => {
    loadRooms()
  }, [buildingIndex])

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h6" mb={2}>
        Leave a review
      </Typography>
      <form onSubmit={leaveReview}>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="building-select-label">Building</InputLabel>
          <Select
            onChange={buildingSelectChange}
            value={buildingIndex}
            labelId="building-select-label"
            label="Building"
          >
            {buildings.map((building, index) => (
              <MenuItem key={index} value={index.toString()}>
                {building.short_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel id="room-select-label">Room</InputLabel>
          <Select
            onChange={roomSelectChange}
            value={roomIndex}
            labelId="room-select-label"
            label="Room"
            disabled={!rooms.length}
          >
            {rooms.length && <MenuItem value="-1">New Room</MenuItem>}

            {rooms.map((room, index) => (
              <MenuItem key={index} value={index.toString()}>
                {room.room_number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {roomIndex === '-1' && (
          <TextField
            label="Enter new room"
            sx={{ m: 1 }}
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
          />
        )}
        <TextField
          value={reviewText}
          onChange={reviewTextChange}
          label="Review"
          multiline
          fullWidth
          sx={{ m: 1 }}
        />
        <FormControl fullWidth sx={{ m: 1 }}>
          <Rating value={rating} onChange={ratingChange} />
        </FormControl>
        <Box mt={2}>
          <Button type="submit" variant="contained">
            Leave Review
          </Button>
        </Box>
      </form>
    </Container>
  )
}
