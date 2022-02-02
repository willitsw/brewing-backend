import * as express from "express";
import cors = require("cors");

import recipesGetById = require("../lambdas/recipes/get-by-id");
import recipesCreateUpdate = require("../lambdas/recipes/create-update");
import recipesDelete = require("../lambdas/recipes/delete");
import recipeQueryByUser = require("../lambdas/recipes/get-by-user");

const app = express();

app.use(express.json());
app.use(cors());

const processRequest = async (lambda, requestObject: express.Request) => {
  return await lambda.handler(
    {
      pathParameters: requestObject.params,
      queryStringParameters: requestObject.query,
      body: JSON.stringify(requestObject.body),
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

// RECIPE ENDPOINTS =======================================================

app.get(
  "/recipes/:id",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(recipesGetById, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.get(
  "/recipes/user/:id",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(recipeQueryByUser, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.post(
  "/recipes",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(recipesCreateUpdate, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.delete(
  "/recipes/:id",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(recipesDelete, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.listen(5000, () => {
  console.log("Beer-backend is running on port 5000");
});

export default app;
