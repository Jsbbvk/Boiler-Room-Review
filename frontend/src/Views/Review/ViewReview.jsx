import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import axios from 'axios'

export default function ViewReview() {
  const { reviewId } = useParams()
  const [review, setReview] = useState()

  useEffect(() => {
    ;(async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${reviewId}`,
        })

        setReview(res?.data?.review)
      } catch (e) {
        console.error(e?.response?.data)
      }
    })()
  }, [reviewId])
  return (
    <Container sx={{ py: 5 }}>
      <pre>returned review: {JSON.stringify(review, null, 2)}</pre>
    </Container>
  )
}
