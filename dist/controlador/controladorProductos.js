"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var negocioProductos = require("../negocio/negocioProductos");
module.exports = {
    getProductos: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, resultado;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = (req.params.id);
                    return [4 /*yield*/, negocioProductos.getProductos(id)];
                case 1:
                    resultado = _a.sent();
                    if (!resultado) {
                        res.status(404).json({ error: "este producto no esta cargado" });
                    }
                    else {
                        return [2 /*return*/, res.status(200).json(resultado)];
                    }
                    return [2 /*return*/];
            }
        });
    }); }
};
// routes.get("/vista-test/", (req: Request, res: Response) => {
//     const cant = Number(req.query.cant);
//     const cantidadAGenerar = isNaN(cant) ? 10 : cant;
//     const fakeProductos = generateData(cantidadAGenerar);
//     if (fakeProductos.length > 0) {
//         res.status(200).json(fakeProductos);
//     } else {
//         res.status(200).json({ error: "no hay productos cargados" });
//     }
// }
// );
// const checkIdProduct = async (req: Request, res: Response, next: () => void) => {
//     const id: string = (req.params.id);
//     const productoById: Producto | undefined = await dao.getProductoById(id);
//     if (productoById) {
//         if (String(productoById._id) === id) {
//             res.status(200).json(productoById);
//         } else {
//             res.status(404).json({ error: "este producto no esta cargado" });
//         }
//     } else {
//         next();
//     }
// };
// routes.get("/listar/:id?", checkIdProduct, async (req: Request, res: Response) => {
//     const products = await dao.getProductos();
//     if (products.length > 0) {
//         res.status(200).json(products);
//     } else {
//         loggerError.error('No se encontraron productos en la base de datos')
//         res.status(404).json({ error: "no hay productos cargados" });
//     }
// }
// );
// routes.post("/agregar", async (req: Request, res: Response) => {
//     if (newSession.getIsAdmin()) {
//         const newProducto: Producto = new Producto(
//             req.body.title,
//             req.body.description,
//             req.body.code,
//             req.body.thumbnail,
//             req.body.price,
//             req.body.stock
//         );
//         await dao.insertProducto(newProducto)
//         io.sockets.emit("products", await dao.getProductos());
//         res.status(200).json({ server: "Producto creado" });
//     } else {
//         res.status(403).json({
//             error: -1,
//             descripcion: "ruta /productos/agregar metodo POST no autorizado",
//         });
//     }
// });
// routes.put("/actualizar/:id", async (req: Request, res: Response) => {
//     if (newSession.getIsAdmin()) {
//         const id: string = (req.params.id);
//         const newProducto: Producto = new Producto(
//             req.body.title,
//             req.body.description,
//             req.body.code,
//             req.body.thumbnail,
//             req.body.price,
//             req.body.stock
//         );
//         if (newProducto) {
//             res.status(200).json(await dao.updateProducto(id, newProducto));
//             io.sockets.emit("products", await dao.getProductos());
//         } else {
//             res.status(404).json({ error: "producto no encontrado" });
//         }
//     } else {
//         res.status(403).json({
//             error: -1,
//             descripcion: `ruta /productos/actualizar/${req.params.id} metodo PUT no autorizado`,
//         });
//     }
// });
// routes.delete("/borrar/:id", async (req: Request, res: Response) => {
//     if (newSession.getIsAdmin()) {
//         const id: string = req.params.id;
//         const productToBeDelete: Producto | undefined = await dao.getProductoById(id);
//         if (productToBeDelete) {
//             res.status(200).json(await dao.deleteProducto(productToBeDelete._id));
//             io.sockets.emit("products", await dao.getProductos());
//         } else {
//             res
//                 .status(404)
//                 .json({ error: "producto no existente, no se puede borrar" });
//         }
//     } else {
//         res.status(403).json({
//             error: -1,
//             descripcion: `ruta /productos/borrar/${req.params.id} metodo DELETE no autorizado`,
//         });
//     }
// });
