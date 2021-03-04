const request = require("supertest");
const app = require("./app");
const fsPromise = require("fs/promises");

const { DB } = require("./api/shorturl");

describe("POST rout test", () => {
  const expectedUrl = { url: "https://www.youtube.com/watch?v=AGNgfYB69UY" };
  const expectedResponse = {
    fullUrl: "https://www.youtube.com/watch?v=AGNgfYB69UY",
    shortid: "D3vcjPwgS",
    createdAt: 1614870806064,
    clicks: 1,
  };

  it("Should get a full url and return the url's object", async () => {
    const response = await request(app)
      .post("/api/shorturl/new")
      .send(expectedUrl);

    expect(response.status).toBe(200);
    expect(`${response.body}`).toEqual(`{expectedResponse}`);
  });
  // it("Should send back an error when it doesnt find the url", async () => {
  //   const response = await request(app)
  //     .post("/api/shorturl/new")
  //     .send(expectedUrl);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toEqual(expectedResponse);
  // });
});
