// IMPORTS
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import connectDB from './db/conn.mjs'
import songRoutes from './Routes/songRoutes.mjs'
import playlistRoutes from './Routes/PlaylistRoutes.mjs'

// Setup
const app = express()
let PORT = process.env.PORT || 3001
dotenv.config()

//DB Connection
connectDB()

//MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// ROUTES
app.use('/songs', songRoutes)
app.use('/playlists', playlistRoutes);
//LISTENER
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})