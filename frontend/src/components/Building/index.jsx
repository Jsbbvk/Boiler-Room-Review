import { Box, Card, Paper, Rating, Stack, Typography } from '@mui/material'

// prettier-ignore
export default function Building({ building }) {
  return (
    <Card sx={{ my: 1, p: 3 }}>
        <Typography variant="h6">{building.name} ({building.short_name})</Typography>
        <Typography variant="subtitle1">
          {building.building_type}
        </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {building.address}
      </Typography>
    </Card>
  )
}
