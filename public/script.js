const socket = io()
var ganhador
var pt1 = 0
var pt2 = 0



// ESCREVER
function escrever(id){

    socket.emit('escrever', id)
    socket.emit('validar','')
}

function login(){
    let name = document.getElementById('name').value
    socket.emit('name',name)
}


//Desenhar Jogo
function drawGame(gamestate){
    document.getElementById('pt1').innerHTML = pt1;
    document.getElementById('pt2').innerHTML = pt2;
    for(let i = 0;i <= 8; i++){
        if(gamestate[i] == 'x'){
            document.getElementById(i).innerHTML = "<span class='xis'>x</span>";
        }
        else if(gamestate[i] == 'o'){
            document.getElementById(i).innerHTML = "<span class='bolinha'>o</span>"; 
        }
        else{
            document.getElementById(i).innerHTML = ''
        }
    }
}

socket.on('att', (plays) =>{
    jogadas = plays;
    drawGame(plays)
})

socket.on('pontos', (pts) =>{
    pt1 = pts.pt1;
    pt2 = pts.pt2;
})



