const request = require("supertest")

const app = require("./app");
let db = require("./fakeDb.js");

let dinoNuggets = {
    name: "dino",
    price: 1000000000
}

let postItem = {
    name: "anotherName",
    price: 1
}

// beforeEach(function(){
//     db.items.push(dinoNuggets)
// })

describe("GET items/dinoNuggets", function() {

    beforeEach(function(){
        db.items.splice(0,db.items.length)
        db.items.push(dinoNuggets)
    
    })

    test("GET /items/", async function () {
        const resp = await request(app).get(`/items`);
        expect(resp.status).toEqual(200);
        expect(resp.body).toEqual({items: [dinoNuggets]});
    });

    test("GET /items/dino", async function () {
        const resp = await request(app).get(`/items/dino`);
        expect(resp.status).toEqual(200);
        expect(resp.body).toEqual(dinoNuggets);
    });

    test("POST /items/name", async function () {
        const someResponse = await request(app).post(`/items`).send(postItem)
        console.log(postItem.name)

        expect(someResponse.status).toEqual(200);

        const resp = await request(app).get(`/items/${postItem.name}`);


        expect(resp.status).toEqual(200);
        expect(resp.body).toEqual(postItem);
    });

    test("PATCH /items/name", async function () {
        let newDinoNuggets = {
            name: "new_dino",
            price: 1000000000
        }

        await request(app).patch(`/items/dino`).send(newDinoNuggets)
        const resp = await request(app).get(`/items/${newDinoNuggets.name}`);

        expect(resp.status).toEqual(200);
        expect(resp.body).toEqual(newDinoNuggets);
    });

    test("DELETE /items/name", async function () {
        await request(app).delete(`/items/dino`)

        const resp = await request(app).get(`/items/dino`);

        expect(resp.status).toEqual(404);
        console.log(resp.body)
        expect(resp.body).toEqual({ error: { message: 'Not Found', status: 404 } });
    });


    }
)


  