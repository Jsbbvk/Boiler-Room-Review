import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import axios from 'axios'

export default function AllReviews() {
  const [reviews, setReviews] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageLimit, setPageLimit] = useState(5)

  useEffect(() => {
    ;(async () => {
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

  return (
    <Container sx={{ py: 5 }}>
      <div>
        <p>Page Number:</p>
        <input type="number" onChange={onPageNumberChange} value={pageNumber} />
      </div>
      <Typography>View single review by id</Typography>
      <Stack>
        {reviews?.map(({ _id }) => (
          <Box key={_id}>
            <Link to={`/review/${_id}`}>Review {_id}</Link>
          </Box>
        ))}
      </Stack>

      <pre>returned reviews: {JSON.stringify(reviews, null, 2)}</pre>
    </Container>
  )
}
