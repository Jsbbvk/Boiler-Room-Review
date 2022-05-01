import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  Select,
  Stack,
  TextField,
  Typography,
  InputLabel,
  MenuItem,
} from '@mui/material'
import axios from 'axios'
import { stringify } from 'querystring'
import Building from '../../components/Building'
import { BUILDING_TYPES } from '../../constants'

export default function BuildingSearch() {
  const [name, setName] = useState('')
  const [buildingType, setBuildingType] = useState('')
  const [buildings, setBuildings] = useState([])

  const onSearch = async (event) => {
    event.preventDefault()
    try {
      let query = {}
      query = name !== '' ? { ...query, name } : query
      query = buildingType !== '' ? { ...query, type: buildingType } : query

      let url = `/building/search`
      if (query.name || query.type) url = `${url}?${stringify(query)}`

      const res = await axios({
        url,
        method: 'post',
        withCredentials: true,
      })
      setBuildings(res.data.items)
    } catch (e) {
      console.error(e)
    }
  }

  const onNameChange = (e) => setName(e.target.value)
  const onBuildingTypeSelect = (e) => setBuildingType(e.target.value)

  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h6">Search Buildings</Typography>
      <Stack sx={{ width: '500px', mt: 2 }} spacing={2}>
        <TextField
          label="name"
          onChange={onNameChange}
          value={name}
          autoComplete="off"
        />
        <FormControl sx={{ width: 1 / 2 }}>
          <InputLabel id="building-type-select-label">Building Type</InputLabel>
          <Select
            value={buildingType}
            onChange={onBuildingTypeSelect}
            labelId="building-type-select-label"
            label="Building Type"
          >
            {Object.keys(BUILDING_TYPES).map((type, index) => (
              <MenuItem key={index} value={type}>
                {BUILDING_TYPES[type]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={onSearch}
          sx={{ width: 'fit-content' }}
        >
          Search
        </Button>
      </Stack>
      <Box mt={3}>
        <Stack>
          {buildings?.map(({ _id, ...data }) => (
            <Building key={_id} id={_id} building={data} />
          ))}
        </Stack>
      </Box>
    </Container>
  )
}
