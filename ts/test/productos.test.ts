import request from "supertest";
import { expect } from "chai";
import { app } from "../app";


describe("TEST API PRODUCTOS", () => {
    describe("GET", () => {
        it("deberia retornar un estado 200", async () => {
            const response = await request(app).get("/productos/listar");
            expect(response.status).to.eql(200);

            response.body.forEach((element: any) => {
                expect(element._id).to.be.a("string");
                expect(element.title).to.be.a("string");
                expect(element.description).to.be.a("string");
                expect(element.code).to.be.a("string");
                expect(element.thumbnail).to.be.a("string");
                expect(element.price).to.be.a("number");
                expect(element.stock).to.be.a("number");
            });

        });
    });

    describe("POST", () => {
        it("deberia incorporar un producto y retornar un estado 201 y una response.body { server: 'Producto creado' }", async () => {
            const producto = {
                title: 'Mocha Chai y Supertest',
                description: 'Mocha Chai y Supertest re locos',
                code: 'mochasup',
                thumbnail: 'https://www.paradigmadigital.com/wp-content/uploads/2017/02/1.png',
                price: 10,
                stock: 100
            }
            const response = await request(app).post("/productos/agregar").send(producto);

            expect(response.status).to.eql(201);
            expect(response.body).to.eql({ server: 'Producto creado' });
        });
    });

    describe("PUT", () => {
        it("deberia retornar un true una vez que se modifica el producto recientemente agregado", async () => {

            const productoModifcado = {
                title: 'Mocha Chai y Supertest modificado',
                description: 'Mocha Chai y Supertest re locos modificado',
                code: 'mochasup',
                thumbnail: 'https://www.paradigmadigital.com/wp-content/uploads/2017/02/1.png',
                price: 10,
                stock: 100
            }
            const productos = await request(app).get("/productos/listar");
            let id = '';
            if (productos.status === 200) {
                const lastProduct = productos.body[productos.body.length - 1];
                id = lastProduct._id;
                const updatedProducto = await request(app).put(`/productos/actualizar/${id}`).send(productoModifcado);        
                expect(updatedProducto.status).to.eql(200);
                expect(updatedProducto.body).to.eql(true);
            }
        });
    });

    describe("DELETE", () => {
        it("deberia borrar el producto recien agregado, devolver un status 200 y un response.body { server: 'Producto borrado' }", async () => {

            const productos = await request(app).get("/productos/listar");
            let id = '';
            if (productos.status === 200) {
                const lastProduct = productos.body[productos.body.length - 1];
                id = lastProduct._id;
                const response = await request(app).delete(`/productos/borrar/${id}`);

                expect(response.status).to.eql(200);
                expect(response.body).to.eql({ server: 'Producto borrado' });
            }
        });
    });



});
