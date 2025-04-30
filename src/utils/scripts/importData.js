require('dotenv').config()
const mongoose = require('mongoose')
const csv = require('csvtojson')
const path = require('path')
const Series = require('../../models/Series')
const Preaching = require('../../models/Preaching')

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('📦 Conectado a MongoDB')
    importData()
  })
  .catch((err) => {
    console.error('❌ Error de conexión a MongoDB:', err)
    process.exit(1)
  })

const normalize = (str) => str?.trim().toLowerCase()

async function importData() {
  try {
    const seriesData = await csv().fromFile(
      path.join(__dirname, '../data/seriesData.csv')
    )
    const preachingsData = await csv().fromFile(
      path.join(__dirname, '../data/preachingsData.csv')
    )

    await Series.deleteMany({})
    await Preaching.deleteMany({})

    const insertedSeries = await Series.insertMany(seriesData)

    const seriesMap = {}
    insertedSeries.forEach((s) => {
      seriesMap[normalize(s.title)] = s._id
    })

    const updatedPreachings = preachingsData.map((p) => {
      const serieId = seriesMap[normalize(p.seriesTitle)]
      if (!serieId) {
        console.warn(`⚠️ No se encontró serie para: ${p.seriesTitle}`)
      }

      return {
        title: p.title,
        videoUrl: p.videoUrl,
        date: p.date,
        content: p.content,
        preacher: p.preacher,
        series: serieId
      }
    })

    for (const preaching of updatedPreachings) {
      const newPreaching = await Preaching.create(preaching)

      if (newPreaching.series) {
        await Series.findByIdAndUpdate(
          newPreaching.series,
          { $push: { preachings: newPreaching._id } },
          { new: true }
        )
      }
    }

    console.log('✅ Datos importados con relaciones correctamente')
    process.exit()
  } catch (err) {
    console.error('❌ Error importando datos:', err)
    process.exit(1)
  }
}
