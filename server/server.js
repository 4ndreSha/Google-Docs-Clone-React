const io = require("socket.io")(3001, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket => {
    socket.on("send-changes", delta => {
        console.log(delta)
      })
})