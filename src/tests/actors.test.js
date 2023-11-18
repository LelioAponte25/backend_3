const request = require('supertest');
const app = require('../app');
require('../models')
let id;


test("GET /actors debe traer a los  actores", async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async () => {
    const actor = {
        firstName: "nombre actualizado",
        lastName: "nombre actualizado",
        nationality: "nacionalidad actualizada",
        image: "imagen actualizada",
        birthday: "1999-12-12"
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
});

test("PUT /actors/:id debe de actualizar un actor", async () => {
    const actor = {
        firstName:"genre actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
})
/*test('POST /artists/:id/genres', async () => {
    const genre = await Genre.create({name: "pop"});
    const res = await request(app).post(`/artists/${id}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});*/

test("DELETE  /actors/:id debe de eliminar un actor ", async() => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204)
});
