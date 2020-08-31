export class FirestoreEnvironment {
  isTest: boolean;
  schema: any;
  constructor(isTest: boolean, schema: any) {
    this.isTest = isTest;
    this.schema = schema;
  }
}

export const firestoreEnv = new FirestoreEnvironment(false, {
  reviews: "reviews",
  users: "users",
});

export const firestoreTestEnv = new FirestoreEnvironment(true, {
  reviews: "test-reviews",
  users: "test-users",
});
