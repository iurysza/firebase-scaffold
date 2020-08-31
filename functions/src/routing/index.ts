/**
 * API
 * Exposes endpoints
 */

import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { unless, validateAuthToken } from "./utils";
import { ServiceLocator } from "../application/helpers/serviceLocator";

const formRoutes = []; // should not be processed by the bodyParser middleware - use a form parser e.g busboy
const unprotectedRoutes = ["/reviews"]; // Does not require authentication

const app = express();
app.use(cors({ origin: true }));
app.use(unless(unprotectedRoutes, validateAuthToken));
app.use(unless(formRoutes, bodyParser.json()));
app.use(unless(formRoutes, bodyParser.urlencoded({ extended: true })));

// controllers
const controllers = ServiceLocator.controllers;
app.get("/reviews", async (req, res) => {
  await (await controllers.reviews()).getReviews(req, res);
});

export default app;
