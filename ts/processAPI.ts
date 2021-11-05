import { app } from "./server"


export const processAPI = async () => {

    const argsv: any = process.argv;
    const args = argsv.splice(2, argsv.length).join(" - ");
    
    const datos = {
        argumentos: args,
        plataforma: process.platform,
        nodeVersion: process.version,
        memoriaUso: process.memoryUsage(),
        path: process.argv[1],
        pid: process.pid,
        carpeta: process.cwd(),
    }


    app.get(
        '/info',
        (_request, res) => res.render("process", { datos, btnAction: '/home' })
    );
}







// 