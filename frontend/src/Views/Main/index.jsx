import { Container } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Main() {
  return (
    <Container sx={{ py: 5 }}>
      <Link to="/reviews">View all reviews</Link>
    </Container>
  )
}
