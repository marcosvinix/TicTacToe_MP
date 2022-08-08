const socket = io()

var messages = []
var foto = ['https://pbs.twimg.com/profile_images/1265738409810722816/cLkZUf3f_400x400.jpg','https://lastfm.freetls.fastly.net/i/u/ar0/dc6a6ea2cf7846d1c4fe3c4bc66cef62.jpg', 'https://lastfm.freetls.fastly.net/i/u/770x0/a4ba72d2d3cf9a5d038b8f08910ecc8d.jpg','https://cpad.ask.fm/971/407/206/910003030-1qo28tq-2c5i5a306ohj1fp/original/1010333_397265717046237_237436407_n.jpg',"https://i.ytimg.com/vi/iSqJwuNJHBI/maxresdefault.jpg","https://lastfm.freetls.fastly.net/i/u/ar0/dc6a6ea2cf7846d1c4fe3c4bc66cef62.jpg","https://feijoadasimulator.top/br/sources/3364.png",'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9ejGv54ykPhrkRqoOF_YGFMFHVcew7ZyQQ&usqp=CAU','https://i1.sndcdn.com/artworks-000093279314-7jfmam-t500x500.jpg','https://c.tenor.com/pPyn5ROtDK8AAAAd/sorrizo-ronaldo.gif','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVa0jpP6SAH5H6BETQ_n8m3IrAP2Sy8oPXPw&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS52MqjfcqtLTVLtQcEZPIpwRkPZYDV_9OqA&usqp=CAU','https://i.ytimg.com/vi/nLhAKN0FI-0/maxresdefault.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOnkwo_qiZf8CkRkfG6Ci6_2oaLjpuvQ4XcQ&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJHiiumCZ0tYUtQQuk_puIDKnBhidpI4GlvQ&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaywwTNTWqUaS5fS7txsk67Dz3_cN9lczv5g&usqp=CAU', 'https://c.tenor.com/pPyn5ROtDK8AAAAd/sorrizo-ronaldo.gif','https://c.tenor.com/eU-y9lmaeRAAAAAd/sorrizo-ronaldo-q-chegou-pose.gif','https://pbs.twimg.com/media/EQ66BhyWsAAvRrJ.jpg','https://i1.sndcdn.com/artworks-000251659027-97f6k5-t500x500.jpg','https://i1.sndcdn.com/artworks-000251645248-51rtu1-t500x500.jpg','https://i1.sndcdn.com/artworks-000251645248-51rtu1-t500x500.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0EXO8uvioldpt7ajycijVqWpciLjQMkgSWrTck95ooDf-2AtjSkz9HLpVaujm4nazhJA&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjcZfP8Ko9lyvDY-iYmJXj1-rjQS4HU2pqdd8rOncglyojiBmpaVdEjkXPJfW03Eh48Ok&usqp=CAU',]

    document.addEventListener ('keypress', (event) => {
        if(event.key === 'Enter'){
            send()
        }
        
    });  

    console.log(foto.length)

    var j = 0;
    document.addEventListener ('keypress', (event) => {
        if(event.key === 'm'){
            j++

            socket.emit('fpm','1')
            if(j == 24){
                j = 0;
            }
            document.getElementById('msg').value = '<img width="500px" src="'+foto[j]+'">'
            send()
        }
        
    });  


    function send(){
        msg = {
            'id':socket.id,
            'message': document.getElementById('msg').value
        }

        if(msg.message != ''){
            const msg1 = document.createElement('div')
            msg1.classList.add('container-xs')
            msg1.classList.add('mt-2')
            msg1.classList.add('d-flex')
            msg1.classList.add('flex-row')
            msg1.setAttribute('style','margin-left: 1vh; align-items: center;')
            msg1.innerHTML = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUBtNY3HlajHM2fpgJu4uBaaoxb1pNagvgz__F3OPA-ZYXXQ-lIII7HRM4svseAoTES74&usqp=CAU" width="40px" style="border-radius: 50%;" alt="">
          
            <p style="margin-top: 1.2vh; margin-left: 1vh;"> <span class="name" style="font-weight: 650;">You   :</span> ${document.getElementById('msg').value}</p>`
            document.getElementById('chatbox').appendChild(msg1)

            var elem = document.getElementById('chatbox');
            elem.scrollTop = elem.scrollHeight;
        
            socket.emit('msg', msg)
            document.getElementById('msg').value = ''

        }
    }


socket.on('connect', () => {
    const id = socket.id
})

var x = 0;
socket.on('svmsg', (mensagem) => {
    mensagemclient = ''
    const msg = document.createElement('div')
    msg.classList.add('container-xs')
    msg.classList.add('mt-2')
    msg.classList.add('d-flex')
    msg.classList.add('flex-row')
    msg.setAttribute('style','margin-left: 1vh; align-items: center;')
    msg.innerHTML = `<img src="https://lastfm.freetls.fastly.net/i/u/ar0/dc6a6ea2cf7846d1c4fe3c4bc66cef62.jpg" width="40px" style="border-radius: 50%;" alt="">
  
    <p style="margin-top: 1.2vh; margin-left: 1vh;"> <span class="name" style="font-weight: 650;">${mensagem.id}:</span> ${mensagem.message}</p>`
    document.getElementById('chatbox').appendChild(msg)
    var elem = document.getElementById('chatbox');
    elem.scrollTop = elem.scrollHeight;
})


document.addEventListener ('keypress', (event) => {
    if(event.key === 'w'){
        socket.emit('audio','audiosom')
        
    }

    if(event.key === 'q'){
        socket.emit('audio','audiosom2')
    }
    if(event.key === 'r'){
        socket.emit('audio','parar')
    }
    
});

socket.on('audio', (audio) => {
    var audiomsc = document.getElementById(audio);
    if(audio == 'parar'){
        audiomsc.pause();
    }
    else{
        audiomsc.play();
    }
})

socket.on('fpm',(x) =>{
    fpm += x;
    document.getElementById('fpm').innerHTML = x;
})

