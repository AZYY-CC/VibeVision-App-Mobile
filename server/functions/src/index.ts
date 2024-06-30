import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();

exports.newUser = functions.auth.user().onCreate((user) => {
  return db
    .collection("user")
    .doc(user.uid)
    .set(JSON.parse(JSON.stringify(user)));
});
