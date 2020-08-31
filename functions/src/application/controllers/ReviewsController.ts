import * as Express from "express-serve-static-core";
import { reportError } from "../helpers/utils";
import { ReviewsDatasource } from "../datasources/ReviewsDatasource";

export class ReviewsController {
  private datasource: ReviewsDatasource;

  constructor(datasource: ReviewsDatasource) {
    this.datasource = datasource;
  }

  getReviews = async (request: Express.Request, response: Express.Response) => {
    try {
      const queryRes = await this.datasource.getAllReviews();
      if (queryRes.isError) {
        reportError(new Error(queryRes.message), request);
      }
      return response.status(queryRes.code).send(queryRes);
    } catch (error) {
      return response.status(500).send({
        message: "Internal Server Error",
        code: 500,
        isError: true,
        data: null,
      });
    }
  };
}

export const get = (datasource: ReviewsDatasource) => {
  return new ReviewsController(datasource);
};
