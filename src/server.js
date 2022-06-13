import http from 'http'
const processId = process.pid

const server = http.createServer((req, res) => {
  for (let index = 0; index < 1e7; index++);
  res.end(`Request handled by process pid: ${processId}`)
})

server.listen(3000).once('listening', () => {
  console.log('Server running on process', processId)
})

process.on('SIGTERM', (code) => {
  console.log('Exit signal received', code)
  server.close(() => process.exit())
})

setTimeout(() => {
  process.exit(1)
}, Math.random() * 1e4)
