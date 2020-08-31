import * as devAccount from "../../../service-account/dev-service-account.json";
import * as firebase from "@firebase/testing";

describe("The  permissions are valid", () => {
  it("Can read items in the reviews collection", async () => {
    const db = firebase
      .initializeTestApp({ projectId: devAccount.project_id })
      .firestore();
    const testDoc = db.collection("reviews").doc("test");
    await firebase.assertSucceeds(testDoc.get());
  });

  it("Can write when the user is authenticated", async () => {
    const auth = { uid: "user_uuid" };
    const db = firebase
      .initializeTestApp({ projectId: devAccount.project_id, auth: auth })
      .firestore();

    const testDoc = db.collection("users").doc("user_uuid");
    await firebase.assertSucceeds(testDoc.set({ anyField: "any_data" }));
  });
});
