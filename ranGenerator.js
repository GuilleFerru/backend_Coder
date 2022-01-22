const generateRandom = () => {
    return Math.floor(Math.random() * 1000 + 1)
}

const calcularRandoms = (cant) => {
    const randomObject = {}

    for (let i = 0; i < cant; i += 1) {
        let random = generateRandom();
        if (randomObject[random]) {
            randomObject[random]++
        } else {
            randomObject[random] = 1
        }
    }
    return randomObject
}


process.on('message', (randomQty) => {
    process.send({ ...calcularRandoms(randomQty.data) })
})