import * as express from "express";
const helloWorldLambda = require("../back-end/lambdas/hello-world");
const recipesGetById = require("../back-end/lambdas/recipes/get-by-id");

const app = express();

const processRequest = async (lambda, requestObject) => {
  return await lambda.handler(
    {
      pathParameters: requestObject.params,
      queryStringParameters: requestObject.query,
    }, // event
    {}, // content
    (error, result) => {
      if (error) console.error(JSON.stringify(error, null, 2));
      return result;
    }
  );
};

app.get("/", (request, response) => {
  response.send("Welcome to Beer Backend!");
});

app.get(
  "/hello/:name",
  async (request: express.Request, response: express.Response) => {
    let data = await processRequest(helloWorldLambda, request);
    response.send(data.body);
  }
);

// RECIPE ENDPOINTS =======================================================

app.get(
  "/recipe",
  async (request: express.Request, response: express.Response) => {
    let data = await processRequest(recipesGetById, request);
    response.send(data.body);
  }
);

app.listen(5000, () => {
  console.log(`Beer-backend is running on port 5000`);
});

export default app;
