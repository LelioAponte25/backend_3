const request = require('supertest');
const app = require('../app');
require('../models')
let id;


test("GET /genres debe traer los generos", async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres debe crear un genero", async () => {
    const genero = {
        name:"nombre actualizado"
    }
    const res = await request(app).post('/genres').send(genero);
    id = res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(genero.name);
});

test("PUT /genres/:id debe de actualizar un genero", async () => {
    const genero = {
        name:"genre actualizado"
    }
    const res = await request(app).put(`/genres/${id}`).send(genero)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genero.name);
})
/*test('POST /artists/:id/genres', async () => {
    const genre = await Genre.create({name: "pop"});
    const res = await request(app).post(`/artists/${id}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});*/

test("DELETE  /genres/:id debe de eliminar un genero ", async() => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204)
});