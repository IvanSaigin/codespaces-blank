const net = require('net')
var middle
var left
var right

const server = net.createServer( cnn => {
    console.log('Новый игрок готов')

    cnn.on('data', data => {
        
        let Data = JSON.parse(data)
        console.log(Data)

            if('range' in Data){
            const reng_client = Data.range
            const reng_client_split = reng_client.split('-').map(Number)
            left = reng_client_split[0]
            right = reng_client_split[1]
            console.log(reng_client)
            middle = Math.floor((left + right)/2)
            cnn.write(JSON.stringify({'answer': `${middle}`}))
        }
        else if('hint' in Data){

            let DH = Data.hint
            if(DH == 'more'){
                left = middle 
            }
            else if(DH == 'less'){
                right = middle
            }
            middle = Math.floor((left + right)/2)
            cnn.write(JSON.stringify({'answer': `${middle}`}))

        }
        else{
            console.log(`Игра закончена\nЗагаданное число - ${middle}`)
            console.log(middle)
        }
    })

})

server.listen(25556, console.log('Готов к игре...'))
