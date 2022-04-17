import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Container, Stack, Typography, TextField } from '@mui/material'
import axios from 'axios'
import Review from '../../components/Review'

export default function AllReviews() {
  const [reviews, setReviews] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(5)

  useEffect(() => {
    ;(async () => {
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
      } catch (e) {
        console.error(e?.response?.data)
      }
    })()
  }, [pageLimit, pageNumber])

  const onPageNumberChange = (e) => {
    const number = e.target.value

    setPageNumber(e.target.value)
  }

  const onPageLimitChange = (e) => setPageLimit(e.target.value)

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
      </Stack>
      <Box mt={3}>
        <Typography>View single review by id</Typography>
        <Stack>
          {reviews?.map(({ _id, ...data }) => (
            <Review key={_id} id={_id} {...data} />
            // <Box key={_id}>
            //   <Link to={`/review/${_id}`}>Review {_id}</Link>
            // </Box>
          ))}
        </Stack>
      </Box>

      {/* <pre>returned reviews: {JSON.stringify(reviews, null, 2)}</pre> */}
    </Container>
  )
}
