import { app } from "./server";

export const processAPI = async () => {
  const argsv: any = process.argv;
  const args = argsv.splice(2, argsv.length).join(" - ");
  const memoria: any = Object.entries(process.memoryUsage());
  const memoAux = memoria.map((memo: any) => `${memo[0]}: ${memo[1]}`);
  const memoriaString = memoAux.join("  -  ");
  
  const datos = {
    argumentos: args,
    plataforma: process.platform,
    nodeVersion: process.version,
    memoriaUso: memoriaString,
    path: process.argv[1],
    pid: process.pid,
    carpeta: process.cwd(),
  };

  app.get("/info", (_request, res) =>
    res.render("process", { datos, btnAction: "/home" })
  );
};

//
