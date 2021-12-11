import { Request, Response } from "express";


const negocioProcess = require("../negocio/negocioProcess");




module.exports = {
    getInfo: function (req: Request, res: Response) {
        const resultado =  negocioProcess.getInfo();
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
    },

    getRandoms: function (req: Request, res: Response) {
        const { cant } = req.query;
        negocioProcess.sendParent(cant || 100000000, (randoms: any) => {
            res.render("process", {
                randoms: randoms,
                btnAction: "/login",
                info: false
            })
        });

    }
}