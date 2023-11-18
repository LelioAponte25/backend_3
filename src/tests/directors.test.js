const request = require('supertest');
const app = require('../app');
require('../models')
let id;


test("GET /directors debe traer a los  directores", async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un director", async () => {
    const director = {
        firstName: "nombre actualizado",
        lastName: "nombre actualizado",
        nationality: "nacionalidad actualizada",
        image: "imagen actualizada",
        birthday: "1999-12-12"
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
});

test("PUT /directors/:id debe de actualizar un director", async () => {
    const director = {
        firstName:"genre actualizado"
    }
    const res = await request(app).put(`/directors/${id}`).send(director)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
})
/*test('POST /artists/:id/genres', async () => {
    const genre = await Genre.create({name: "pop"});
    const res = await request(app).post(`/artists/${id}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});*/

test("DELETE  /directors/:id debe de eliminar un director ", async() => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204)
});