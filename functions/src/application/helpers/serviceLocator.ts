import {
  firestoreEnv,
  FirestoreEnvironment,
  firestoreTestEnv,
} from "./environment";
import * as admin from "firebase-admin";

export module ServiceLocator {
  export const firebaseAdmin = admin.initializeApp();
  export const firestore = firebaseAdmin.firestore();
  let environment: FirestoreEnvironment = firestoreEnv;

  export function init({ isTest = false }: { isTest: Boolean }) {
    if (isTest) {
      environment = firestoreTestEnv;
    } else {
      environment = firestoreEnv;
    }
  }

  export const datasource = {
    reviews: async () => {
      return (await import("../datasources/ReviewsDatasource")).get(
        firestore,
        environment
      );
    },
  };
  export const controllers = {
    reviews: async () => {
      return (await import("../controllers/ReviewsController")).get(
        await datasource.reviews()
      );
    },
  };
}
