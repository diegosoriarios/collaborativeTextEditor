const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

const PORT = 8080

app.use(express.static('public'))

let users = {}
let text = ''

io.on('connection', socket => {
    socket.on('new-user', state => {
        console.log("New user joined with state: ", state)
        users[socket.id] = state
        io.emit('update-users', users)
        io.emit('update-text', text)
    })

    socket.on('disconnect', state => {
        delete users[socket.id]
        io.emit('update-users', users)
    })

    socket.on('create-room', room => {
        socket.join(room)
    })

    socket.on('change-text', state => {
        console.log(`User change text`)
        console.log(state)
        text = state.text
        io.to(state.room).emit('update-text', state.text)
    })
})

server.listen(PORT, () => {
    console.log(`App is listening of port: ${PORT}`)
})