import os from 'os'
import cluster from 'cluster'

const runPrimaryProcess = () => {
  const processes = os.cpus().length * 2
  console.log(`Primary process running on ${process.pid}`)
  console.log(`Forking server with ${processes} processes`)

  for (let i = 0; i < processes; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died... scheduling another one`)
      cluster.fork()
    }
  })
}

const runWorkerProcess = async () => {
  await import('./server.js')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()
