import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemText,
  Checkbox,
} from '@mui/material'
import axios from 'axios'
import Review from '../../components/Review'

const REVIEW_LEVELS = [5, 4, 3, 2, 1]

export default function AllReviews() {
  const [reviews, setReviews] = useState([])
  const [filteredReviews, setFilteredReviews] = useState([])

  const [buildings, setBuildings] = useState([])
  const [filterBuildings, setFilterBuildings] = useState([])

  const [reviewLevel, setReviewLevel] = useState('')

  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(5)

  const fetchReviews = async () => {
    if (!pageNumber || !pageLimit) return
    try {
      const res = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_SERVER_URL}/reviews`,
        params: {
          pageNumber,
          pageLimit,
        },
      })

      setReviews(res?.data?.reviews)
      setFilteredReviews(res?.data?.reviews)

      const newBuildings = res?.data?.reviews.map(
        ({ building }) => building.short_name
      )
      setBuildings([...new Set(newBuildings)])
    } catch (e) {
      console.error(e?.response?.data)
    }
  }

  const updateFilteredReviews = () => {
    const newFilteredReviews = reviews
      .filter(({ building }) =>
        filterBuildings.length === 0
          ? true
          : filterBuildings.indexOf(building.short_name) !== -1
      )
      .filter(({ rating }) =>
        reviewLevel === '' ? true : rating >= reviewLevel
      )

    setFilteredReviews(newFilteredReviews)
  }

  const onBuildingSelect = (e) => setFilterBuildings(e.target.value)

  const onReviewLevelSelect = (e) => setReviewLevel(e.target.value)

  const onPageNumberChange = (e) => setPageNumber(e.target.value)

  const onPageLimitChange = (e) => setPageLimit(e.target.value)

  useEffect(() => {
    fetchReviews()
  }, [pageLimit, pageNumber])

  useEffect(() => {
    updateFilteredReviews()
  }, [filterBuildings, reviewLevel])

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h6">Query options</Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          '& > *': { width: '100px' },
          mt: 2,
        }}
      >
        <TextField
          label="Page Number"
          variant="outlined"
          onChange={onPageNumberChange}
          value={pageNumber}
        />
        <TextField
          label="Page Limit"
          variant="outlined"
          onChange={onPageLimitChange}
          value={pageLimit}
        />
        <FormControl sx={{ width: 1 / 4 }}>
          <InputLabel id="building-select-label">Building</InputLabel>
          <Select
            value={filterBuildings}
            onChange={onBuildingSelect}
            labelId="building-select-label"
            label="Building"
            renderValue={(selected) => selected.join(', ')}
            multiple
          >
            {buildings?.map((building, index) => (
              <MenuItem key={index} value={building}>
                <Checkbox checked={filterBuildings.indexOf(building) !== -1} />
                <ListItemText primary={building} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 1 / 4 }}>
          <InputLabel id="review-select-label">Review Level</InputLabel>
          <Select
            value={reviewLevel}
            onChange={onReviewLevelSelect}
            labelId="review-select-label"
            label="Review Level"
          >
            {REVIEW_LEVELS.map((level, index) => (
              <MenuItem key={index} value={level}>
                {`${level}${level !== 5 ? '+' : ''}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box mt={3}>
        <Typography>View single review by id</Typography>
        <Stack>
          {filteredReviews?.map(({ _id, ...data }) => (
            <Review key={_id} id={_id} {...data} />
          ))}
        </Stack>
      </Box>
    </Container>
  )
}
