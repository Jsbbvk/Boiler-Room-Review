import to from 'await-to-js'
import { Building, Room, User, Review } from '../models'
import { BUILDING_TYPES, ROOM_TYPES } from '../../constants'
import mongoConnect from '../'
require('dotenv-flow').config()

/*
  Used to populate MongoDB with new documents

  No need to worry about duplicates (and existing documents in the collection) 
  since each document has an unique id

  run with: 
    npm run seed
*/
;(async () => {
  await mongoConnect()

  // change this to modify size
  const numObjects = 10

  let buildings = []
  const rooms = []
  let users = []
  const reviews = []

  // create buildings
  await [...new Array(numObjects).keys()].reduce(async (prev, i) => {
    await prev
    return new Promise(async (res, rej) => {
      const data = {
        short_name: `BLDG-${i}`,
        name: `building-${i}`,
        // randomly set the address
        ...(Math.random() < 0.5 && {
          address: `${Math.floor(
            Math.random() * 100 + 1000
          )} State St, West Lafayette, IN 47907`,
        }),
        building_type:
          Object.values(BUILDING_TYPES)[
            Math.floor(Math.random() * Object.values(BUILDING_TYPES).length)
          ],
      }

      const [err, building] = await to(Building.create(data))
      buildings.push(building)
      res()
    })
  }, Promise.resolve())

  // create rooms
  await [...new Array(numObjects * 2).keys()].reduce(async (prev, i) => {
    await prev

    return new Promise(async (res) => {
      const number = Math.floor(Math.random() * 100 + 20)
      const building = buildings[Math.floor(Math.random() * buildings.length)]

      const data = {
        room_number: `room-${number}`,
        building: building._id,
        room_type:
          Object.values(ROOM_TYPES)[
            Math.floor(Math.random() * Object.values(ROOM_TYPES).length)
          ],
      }

      const [errSave, room] = await to(Room.create(data))
      if (errSave) return [null]

      const [err] = await to(
        Building.findByIdAndUpdate(building._id, {
          $push: { rooms: room._id },
        })
      )

      if (err) {
        console.error(err)
      }
      rooms.push(room)
      res()
    })
  })

  // repopulate buildings
  const tempBuildings = []
  await buildings.reduce(async (prev, { _id }) => {
    await prev
    return new Promise(async (res) => {
      const [err, building] = await to(Building.findById(_id))
      tempBuildings.push(building)
      res()
    })
  }, Promise.resolve)

  buildings = tempBuildings

  // create users
  await [...new Array(numObjects).keys()].reduce(async (prev, i) => {
    await prev
    return new Promise(async (res) => {
      const user = new User()
      // const data = {
      //   username: `user-${i}`,
      //   email: `user-${i}@email.com`,
      //   password: 'some password',
      // }
      user.username = `user-${user._id}`
      user.email = `user-${user._id}@email.com`
      user.password = `password-${user._id}`

      const [err] = await to(user.save())
      if (err) {
        console.error(err)
      }

      users.push(user)
      res()
    })
  }, Promise.resolve())

  // create reviews
  await [...new Array(numObjects * 2).keys()].reduce(async (prev, i) => {
    await prev
    return new Promise(async (res) => {
      const user = users[Math.floor(Math.random() * users.length)]
      const room = rooms[Math.floor(Math.random() * rooms.length)]
      const building = buildings[Math.floor(Math.random() * buildings.length)]

      const data = {
        author: user._id,
        building: building._id,
        ...(Math.random() < 0.8 && { room: room._id }),
        rating: Math.floor(Math.random() * 5 + 1),
        review: 'some review blah blah blah',
      }

      const [err, review] = await to(Review.create(data))
      if (err) console.error(err)

      await User.findByIdAndUpdate(user._id, {
        $push: { reviews: review._id },
      })

      reviews.push(review)
      res()
    })
  }, Promise.resolve)

  // repopulate the mfing users
  const tempUsers = []
  await users.reduce(async (prev, { _id }) => {
    await prev
    return new Promise(async (res) => {
      const [err, user] = await to(User.findById(_id))
      tempUsers.push(user)
      res()
    })
  }, Promise.resolve)
  users = tempUsers

  // console.log('rooms', rooms)
  // console.log('buildings', buildings)
  // console.log('reviews', reviews)
  // console.log('users', users)

  console.log('added seed!')
  process.exit()
})()
