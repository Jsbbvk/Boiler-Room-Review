import { Box, Card, Paper, Rating, Stack, Typography } from '@mui/material'

export default function Review({ id, room, building, rating, review }) {
  return (
    <Card sx={{ my: 1, p: 3 }}>
      <Stack direction="row" alignItems="center">
        <Typography variant="h6">
          {building.short_name} {room.room_number}
        </Typography>
        <Rating value={rating} sx={{ ml: 2 }} readOnly />
      </Stack>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {review}
      </Typography>
    </Card>
  )
}
