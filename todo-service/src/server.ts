import app from './app'

const PORT = process.env.PORT;

async function startServer() {
  app.listen(PORT, async () => {
    console.log(`The application is running on ${PORT}`)
  })
}

startServer()