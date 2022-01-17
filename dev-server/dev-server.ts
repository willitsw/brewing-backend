import * as express from "express";
const helloWorldLambda = require("../back-end/lambdas/hello-world");
const recipesGetById = require("../back-end/lambdas/recipes/get-by-id");

const app = express();

app.get("/", (request, response) => {
  response.send("Welcome to Beer Backend!");
});

app.get("/hello", async (request, response) => {
  let data = await helloWorldLambda.handler(
    {}, // event
    {}, // content
    (error, result) => {
      if (error) console.error(JSON.stringify(error, null, 2));
      return result;
    }
  );
  response.send(data);
});

// RECIPE ENDPOINTS =======================================================

app.get(
  "/recipe",
  async (request: express.Request, response: express.Response) => {
    let data = await recipesGetById.handler(
      {}, // event
      {}, // content
      (error, result) => {
        if (error) console.error(JSON.stringify(error, null, 2));
        return result;
      }
    );
    response.send(data);
  }
);

app.listen(5000, () => {
  console.log(`Beer-backend is running on port 5000`);
});

// Export your express server so you can import it in the lambda function.
export default app;
