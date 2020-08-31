import { Firestore } from "@google-cloud/firestore";
import { FirestoreEnvironment } from "../helpers/environment";
import { QueryResult } from "../models/QueryResult";

export class ReviewsDatasource {
  private firestore: Firestore;
  private environment: FirestoreEnvironment;

  constructor(firestore: Firestore, environment: FirestoreEnvironment) {
    this.firestore = firestore;
    this.environment = environment;
  }

  async getAllReviews(): Promise<QueryResult> {
    try {
      const snapshot = await this.firestore
        .collection(this.environment.schema.reviews)
        .get();
      if (snapshot.empty) {
        return {
          message: "No reviews available",
          code: 200,
          isError: false,
          data: { reviews: [] },
        };
      }

      const reviews = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return {
        message: "Success",
        code: 200,
        isError: false,
        data: { reviews },
      };
    } catch (error) {
      console.error(new Error(error.message));
      return {
        message: "Internal Server Error",
        code: 500,
        isError: true,
        data: null,
      };
    }
  }
}

export const get = (
  firestore: Firestore,
  environment: FirestoreEnvironment
) => {
  return new ReviewsDatasource(firestore, environment);
};
