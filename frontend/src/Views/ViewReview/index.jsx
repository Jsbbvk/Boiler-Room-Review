import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Container, Typography } from '@mui/material'

export default function ViewReview() {
  const { reviewId } = useParams()

  useEffect(() => {
    console.log(reviewId)
    console.log(process.env.REACT_APP_SERVER_URL)
  }, [reviewId])
  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h6">review id: {reviewId}</Typography>
    </Container>
  )
}
