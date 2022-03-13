import { Container } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Main() {
  return (
    <Container sx={{ py: 5 }}>
      <Link to="/review/123">View Review</Link>
    </Container>
  )
}
