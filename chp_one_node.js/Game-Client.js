const net = require('net')

const reng_left = process.argv[2]
const reng_right = process.argv[3]
const random_number = Math.floor(Math.random()*(reng_right-reng_left+1) + reng_left)

if(!reng_left && !reng_right) throw Error('Укажите диапозон для числа')

const client = net.connect({port: 25556}, () => {
    console.log('Вы успешно начали игру\n')
    const reng = JSON.stringify({"range": `${reng_left}-${reng_right}`})
    client.write(reng)

    client.on('data', data => {        
        const Data = JSON.parse(data).answer
        console.log(Data)

        if(random_number>Data){
            client.write(JSON.stringify({"hint": "more"}))
        }
        else if(random_number<Data){
            client.write(JSON.stringify({"hint": "less"}))         
        }
        else{
            client.write(JSON.stringify({"The End": random_number}))
            console.log('Игра закончена')
        }
    })  
})
