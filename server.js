import express from 'express'
import http from 'http'
import socketio from 'socket.io'
var io = socketio

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

//variaveis do game

const socket = io()
var pt1 = 0
var pt2 = 0
var movimentos = 0
var jogadas = ["","","","","","","","",""]
var ganhador
var connectedp = 0
//pasta default

app.use(express.static('public'))

//game

var player1 = {
    'name':'',
    'id':'',
    'vez': true
}
var player2 = {
    'name':'',
    'id':'',
    'vez': false
}

function resetar(){
    jogadas = ['','','','','','','','','']
    movimentos = 0
    ganhador = ''
    pontos()
    sockets.emit('att', jogadas)
}

function validar(){
    movimentos ++

    // LINHAS
    if(jogadas[0] == jogadas[1] && jogadas[0] == jogadas[2]){
        ganhador = jogadas[0];
        pontos()
    }
    if(jogadas[3] == jogadas[4] && jogadas[3] == jogadas[5]){
        ganhador = jogadas[3];
        pontos()
    }
    if(jogadas[6] == jogadas[7] && jogadas[6] == jogadas[8]){
        ganhador = jogadas[6];
        pontos()
    } 

    // COLUNAS
    if(jogadas[0] == jogadas[3] && jogadas[0] == jogadas[6]){
        ganhador = jogadas[0];
        pontos()
    }
    if(jogadas[1] == jogadas[4] && jogadas[1] == jogadas[7]){
        ganhador = jogadas[1];
        pontos()
    }
    if(jogadas[2] == jogadas[5] && jogadas[2] == jogadas[8]){
        ganhador = jogadas[2];
        pontos()
    }
    
    // DIAGONAIS
    if(jogadas[0] == jogadas[4] && jogadas[0] == jogadas[8]){
        ganhador = jogadas[0];
        pontos()
    }
    if(jogadas[2] == jogadas[4] && jogadas[2] == jogadas[6]){
        ganhador = jogadas[2];
        pontos()
    }

    if(movimentos == 9) {
        resetar()
    }

}

function pontos(){
    sockets.emit('pontos', {
        'pt1':pt1,
        'pt2':pt2
    })

    sockets.emit('att', jogadas)

        if(ganhador == 'x'){
            pt1++
            resetar()
        }
        else if(ganhador== 'o'){
            pt2++
            resetar()
        }
        
}


//sockets
sockets.on('connection', (socket) => {

    var connectedp1 = false
    var connectedp2 = false

    if(connectedp1 == false && player1.id == ''){
        player1.name = 'teste'
        player1.id = socket.id
        connectedp1 = true
    }
    else if(connectedp2 == false && player2.id == ''){
        player2.name = 'teste2'
        player2.id = socket.id
        connectedp2 = true
    }
    else{
        console.log('mais de players conectados')
    }

    console.log(connectedp)
    console.log(player1)
    console.log(player2)


    socket.on('escrever', (id)=>{


        console.log('player1:' + player1.id +'|||||'+ socket.id)
        console.log('player2:' + player2.id +'|||||'+ socket.id)
        console.log('vez:'+player1.vez)
        console.log('jogadas:'+jogadas[id])

        if(player1.id == socket.id && player1.vez == true){
            jogadas[id] = "x"
            sockets.emit('att', jogadas)
            validar()
            player1.vez = false
            player2.vez = true
        }
        else if(player2.id == socket.id && player2.vez == true){
            jogadas[id] = "o"
            sockets.emit('att', jogadas)
            validar()
            player2.vez = false
            player1.vez = true
        }

        
    })

    // socket.on('validar', (obj) => {
    //     validar()
    // })


    socket.on('disconnect', () => {
        console.log(`> Cient disconnected: ${socket.id}`)
        connectedp--
        if(socket.id == player1.id){
            player1.name = ''
            player1.id = '';
            connectedp1 = false
        }
        else if(socket.id == player2.id){
            player2.name = ''
            player2.id = '';
            connectedp2 = false
        }
        console.log(connectedp)
})
})

//server
server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
})