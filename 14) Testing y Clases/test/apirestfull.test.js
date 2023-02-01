const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;

describe("POST", () => {
  const product = {
    name: "papas",
    price: 1231,
    urlPhoto:
      "https://cdn3.iconfinder.com/data/icons/street-food-and-food-trucker-1/64/hamburger-fast-food-patty-bread-128.png",
  };

  it("estado guardar Producto", async () => {
    let response = await request.post("/products").send(product);
    const { response: productSave } = response.body;
    console.log(productSave);
    expect(response.status).to.eq(200);
    expect(productSave).to.includes.keys(["name", "price", "urlPhoto"]);
    expect(typeof productSave.name).to.equal("string")
    expect(typeof productSave.price).to.equal("string")
    expect(typeof productSave.urlPhoto).to.equal("string")


  });
});
