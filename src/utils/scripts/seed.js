const mongoose = require('mongoose')
require('dotenv').config()
const fs = require('fs')
const csv = require('csv-parser')
const { connectDB } = require('../../config/db')
const Preaching = require('../../models/Preaching')
const Event = require('../../models/Event')
const path = require('path')
const Series = require('../../models/Series')

const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err))
  })
}

const seedDatabase = async () => {
  try {
    await connectDB()

    // Limpiar base de datos
    await Preaching.deleteMany()
    await Event.deleteMany()
    await Series.deleteMany() // Limpiar la colección Series

    // Leer predicaciones
    const preachingsCSV = await readCSV(
      path.join('src', 'utils', 'data', 'preachingsData.csv')
    )
    const insertedPreachings = await Preaching.insertMany(
      preachingsCSV.map((p) => ({
        title: p.title,
        preacher: p.preacher,
        date: new Date(p.date),
        content: p.content,
        videoUrl: p.videoUrl
      }))
    )

    // Crear un mapa para relacionar ID artificial con MongoID
    const preachingMap = {}
    preachingsCSV.forEach((p, i) => {
      preachingMap[p.preachingId] = insertedPreachings[i]._id
    })

    // Leer eventos
    const eventsCSV = await readCSV(
      path.join('src', 'utils', 'data', 'eventsData.csv')
    )

    const formattedEvents = eventsCSV.map((e) => ({
      image: e.image,
      title: e.title,
      date: new Date(e.date),
      description: e.description,
      location: e.location,
      preaching: preachingMap[e.preachingId] || null
    }))

    await Event.insertMany(formattedEvents)

    // Leer series
    const seriesCSV = await readCSV(
      path.join('src', 'utils', 'data', 'seriesData.csv')
    )

    const formattedSeries = seriesCSV.map((s) => ({
      title: s.title,
      description: s.description,
      image: s.image,
      videoURL: s.videoURL,
      preachings: s.preachings
        ? s.preachings.split(',').map((id) => preachingMap[id.trim()] || null)
        : []
    }))

    await Series.insertMany(formattedSeries)

    console.log('✅ Base de datos sembrada correctamente')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error al sembrar la base de datos:', error)
    process.exit(1)
  }
}

seedDatabase()
