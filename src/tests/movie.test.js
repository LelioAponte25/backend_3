const request = require('supertest');
const app = require('../app');
const Genres = require('../models/Genres');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
require('../models')
let id;


test("GET /movies debe traer las peliculas", async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una pelicula", async () => {
    const pelicula = {
        name:"nombre actualizado",
        image: "imagen actualizada",
        synopsis: "pelicula actualizada",
        releaseYear: "1999"
    }
    const res = await request(app).post('/movies').send(pelicula);
    id = res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(pelicula.name);
});

test('POST /movies/:id/genres', async () => {
    const genre = await Genres.create({name: "drama"});
    const res = await request(app).post(`/movies/${id}/genres`)
    .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    console.log(res.body)
});

test('POST /movies/:id/actors', async () => {
    const actor = await  Actors.create({
    firstName: "nombre actualizado",
    lastName: "nombre actualizado",
    nationality: "nacionalidad actualizada",
    image: "imagen actualizada",
    birthday: "1999-12-12"
});
    const res = await request(app).post(`/movies/${id}/actors`)
    .send( [actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    console.log(res.body)
});

test('POST /movies/:id/directors', async () => {
    const director = await  Directors.create({
    firstName: "nombre actualizado",
    lastName: "nombre actualizado",
    nationality: "nacionalidad actualizada",
    image: "imagen actualizada",
    birthday: "1999-12-12"
});
    const res = await request(app).post(`/movies/${id}/directors`)
    .send( [director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    console.log(res.body)
});

test("PUT /movies/:id debe de actualizar una pelicula", async () => {
    const pelicula = {
        name:"genre actualizado"
    }
    const res = await request(app).put(`/movies/${id}`).send(pelicula)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(pelicula.name);
});


test("DELETE  /movies/:id debe de eliminar una pelicula ", async() => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204)
});