/* eslint-disable @typescript-eslint/no-var-requires */
import * as express from "express";

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const processRequest = async (lambda, requestObject: express.Request) => {
  return await lambda.handler(
    {
      pathParameters: requestObject.params,
      queryStringParameters: requestObject.query,
      body: JSON.stringify(requestObject.body),
      headers: {
        authorization: requestObject.headers?.authorization || "",
      },
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

const recipesGetById = require("../lambdas/recipes/get-by-id");
const recipesCreateUpdate = require("../lambdas/recipes/create-update");
const recipesDelete = require("../lambdas/recipes/delete");
const recipeQueryByUser = require("../lambdas/recipes/get-by-user");

app.get(
  "/recipes/:id",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(recipesGetById, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.get(
  "/recipes",
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

// USER ENDPOINTS =======================================================

const userGetById = require("../lambdas/users/get");
const userCreateUpdate = require("../lambdas/users/create-update");

app.get(
  "/users",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(userGetById, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.post(
  "/users",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(userCreateUpdate, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

// BREW LOG ENDPOINTS =======================================================

const brewLogGetById = require("../lambdas/brew-log/get-by-id");
const brewLogCreateUpdate = require("../lambdas/brew-log/create-update");
const brewLogDelete = require("../lambdas/brew-log/delete");
const brewLogQueryByUser = require("../lambdas/brew-log/get-by-user");

app.get(
  "/brew-logs/:id",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(brewLogGetById, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.get(
  "/brew-logs",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(brewLogQueryByUser, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.post(
  "/brew-logs",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(brewLogCreateUpdate, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

app.delete(
  "/brew-logs/:id",
  async (request: express.Request, response: express.Response) => {
    const data = await processRequest(brewLogDelete, request);
    response.status(data.statusCode).send(JSON.parse(data.body));
  }
);

// MISC =======================================================

app.listen(5000, () => {
  console.log("Beer-backend is running on port 5000");
});

export default app;
