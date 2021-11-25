import { app } from "./server";
import { fork } from 'child_process';
import { ParsedQs } from "qs";
import * as os from 'os';

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


export const processAPI = async () => {
    
    const argsv: any = process.argv;
    const args = argsv.splice(2, argsv.length).join(" - ");
    const memoria: any = Object.entries(process.memoryUsage());
    const memoAux = memoria.map((memo: any) => `${memo[0]}: ${memo[1]}`);
    const memoriaString = memoAux.join("  -  ");
    const numCPUs = os.cpus().length

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

    app.get("/info", (_, res) => {

        //-------------------------
        //MODIFIFCAR SEGUN TEST
        //-------------------------
        // console.log(datos);
 
        //-------------------------
        res.render("process", {
            datos,
            btnAction: "/login",
            info: true
        })
    });


    const childRandom = fork("./ts/ranGenerator.ts");
    var callbackReturn: any = {};

    const sendParent = (data: string | number | ParsedQs | string[] | ParsedQs[], callback: (randoms: any) => void) => {
        childRandom.send({ data: data });
        callbackReturn = callback;
    }

    childRandom.on('message', function (randoms: any) {
        callbackReturn(randoms);
    });

    app.get('/randoms', async (req, res) => {
        const { cant } = req.query;
        sendParent(cant || 100000000, randoms => {
            res.render("process", {
                randoms: randoms,
                btnAction: "/login",
                info: false
            })
        });
    });
}
