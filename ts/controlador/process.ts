import { Request, Response } from "express";


const ApiProcess = require("../api/process");


class ControladorProcess {

    private apiProcess: typeof ApiProcess;
    
    constructor() {
        this.apiProcess = new ApiProcess();
    }

    getInfo = (_req: Request, res: Response) => {
        const resultado = this.apiProcess.getInfo();
        if (!resultado) {
            res.status(404).json({ error: "no se pudo cargar la info" });
        } else {
            res.render("process", {
                resultado,
                btnAction: "/login",
                info: true
            }
            );
        }
    };

    getRandoms = (req: Request, res: Response) => {
        const { cant } = req.query;
        this.apiProcess.sendParent(cant || 100000000, (randoms: any) => {
            res.render("process", {
                randoms: randoms,
                btnAction: "/login",
                info: false
            })
        });

    };
}

module.exports = ControladorProcess;