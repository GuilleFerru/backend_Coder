import { app } from "./server";
import { fork } from 'child_process';
import { ParsedQs } from "qs";
import * as os from 'os';


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

    app.get("/info", (_, res) =>
        res.render("process", {
            datos,
            btnAction: "/home",
            info: true
        })
    );


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
                btnAction: "/home",
                info: false
            })
        });
    });
}
