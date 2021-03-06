const request = require("supertest");
const app = require("./app");
const fsPromise = require("fs/promises");
const { DB } = require("./api/shorturl");
const { response } = require("express");
const { locals } = require("./app");
const testsUrl = { url: "https://www.youtube.com/" };
const expectedResponse = {
  fullUrl: "https://www.youtube.com/",
  shortid: "gv5TqP1iQ",
  createdAt: "5.3.2021, 12:59:24",
  clicks: 1,
};
const newUrl = { url: "https://finviz.com/" };

/********resetting the tests database after each test to it`s initial value*******/
afterAll(async () => {
  await fsPromise.writeFile(
    `./DataBase/testDataBase.json`,
    JSON.stringify([expectedResponse], null, 4),
    (e) => {
      console.log(e);
    }
  );
});
/******************************Testing POST method*******************************************/

describe("POST route tests", () => {
  it("Should save to the dataBase new given url's", async () => {
    const DBLengthBefore = DB.urls.length;
    const res = await request(app).post("/api/shorturl/new").send(newUrl);

    expect(res.status).toBe(201);
    expect(DB.urls.length).toBeGreaterThan(DBLengthBefore);
  });

  it("Should get a full url and return the url's object", async () => {
    const response = await request(app)
      .post("/api/shorturl/new")
      .send(testsUrl);
    const storedUrl = DB.urls[0];
    expect(response.status).toBe(200);

    expect(storedUrl.createdAt).toEqual(expectedResponse.createdAt);
  });

  it("Should return an error message for invalid url", async () => {
    const invalidUrl = { url: "niohgfoeirjgio[rejg].com" };

    const response = await request(app)
      .post("/api/shorturl/new")
      .send(invalidUrl);

    expect(response.status).toBe(404);

    expect(response.body).toEqual({ msg: `${new Error()}"Invalid URL` });
  });
});

/*****************************Testing GET method********************************************/
describe("GET test", () => {
  it("Should get a shorten url and redirect to the original path", async () => {
    const res = await request(app).get("/api/shorturl/gv5TqP1iQ");

    expect(res.status).toBe(302);
    expect(res.header.location).toBe("https://www.youtube.com/");
  });

  it("Should get a none existing shorten url and receive back an Error", async () => {
    const res = await request(app).get("/api/shorturl/-Xiuplgb8");

    expect(res.status).toBe(404);
  });

  test(" if clicks property increases by one on each short link redirection", async () => {
    const res = await request(app).get("/api/shorturl/gv5TqP1iQ");
    const thisUrl = DB.urls.find((urlObj) => {
      if (urlObj.shortid === "gv5TqP1iQ") {
        return true;
      }
    });
    expect(thisUrl.clicks).toBe(2);
  });
});
/*******************************Testing statistics method******************************************/

describe("Statistics test", () => {
  it("Should get a short url and send back his obj", async () => {
    const res = await request(app).get("/api/statistics/gv5TqP1iQ");
    const resElement = `<!DOCTYPE html><html> <head> <title>statistic</title><link rel="stylesheet" href="../../public/style.css"></head><body> <h1> URL Statistics </h1><table> <tr> <th>full Url</th><th>Short Url</th><th>Creation Time</th><th>Redirect Count</th><hr><tr> <td>https://www.youtube.com/</td><td>gv5TqP1iQ</td><td>5.3.2021, 12:59:24</td><td>2</td></tr></tr></table></body></html>`;
    expect(res.status).toBe(200);
    expect(res.text).toBe(resElement);
  });
});
