import * as os from 'os';
import { fork } from 'child_process';
import { ParsedQs } from "qs";


const generateRandom = () => {
    return Math.floor(Math.random() * 1000 + 1)
}

const calcularRandoms = (cant: number) => {
    const randomObject: any = {}

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


process.on('message', (randomQty: any) => {
    process.send!({ ...calcularRandoms(randomQty.data) })
})

const argsv: any = process.argv;
const args = argsv.splice(2, argsv.length).join(" - ");
const memoria: any = Object.entries(process.memoryUsage());
const memoAux = memoria.map((memo: any) => `${memo[0]}: ${memo[1]}`);
const memoriaString = memoAux.join("  -  ");
const numCPUs = os.cpus().length

const childRandom = fork("./ts/ranGenerator.ts");
var callbackReturn: any = {};

childRandom.on('message', function (randoms: any) {
    callbackReturn(randoms);
});

module.exports = {
    getInfo: () => {
        const datos = {
            argumentos: args,
            plataforma: process.platform,
            nodeVersion: process.version,
            memoriaUso: memoriaString,
            path: process.argv[1],
            pid: process.pid,
            carpeta: process.cwd(),
            numCPUs: numCPUs
        };
        return datos;
    },
    sendParent: (data: string | number | ParsedQs | string[] | ParsedQs[], callback: (randoms: any) => void) => {
        childRandom.send({ data: data });
        callbackReturn = callback;
    }
}

