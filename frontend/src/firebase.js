// import { getAuth } from "firebase/auth";
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: 'AIzaSyCgk12XD0v__6r69N0b9j43mKbZbHfcnbs',
//     authDomain: "know-your-business.firebaseapp.com",
//     projectId: "know-your-business",
//     storageBucket: "know-your-business.appspot.com",
//     messagingSenderId: "173040266126",
//     appId: "1:173040266126:web:e0435886e24a57146dd2df",
//     measurementId: "G-P85B6DT3KK"
//   };
// const app = initializeApp({firebaseConfig})

// const auth = getAuth();
// const db = getFirestore(app);
// // const googleProvider = new auth.GoogleAuthProvider();

// // const signInWithGoogle = async () => {
// //   try {
// //     const res = await auth.signInWithPopup(googleProvider);
// //     const user = res.user;
// //     const query = await db
// //       .collection("users")
// //       .where("uid", "==", user.uid)
// //       .get();
// //     if (query.docs.length === 0) {
// //       await db.collection("users").add({
// //         uid: user.uid,
// //         name: user.displayName,
// //         authProvider: "google",
// //         email: user.email,
// //       });
// //     }
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.message);
// //   }
// // };
// const signInWithEmailAndPassword = async (email, password) => {
//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };
//   const registerWithEmailAndPassword = async (name, email, password) => {
//     try {
//       const res = await auth.createUserWithEmailAndPassword(email, password);
//       const user = res.user;
//       await db.collection("users").add({
//         uid: user.uid,
//         name,
//         authProvider: "local",
//         email,
//       });
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const sendPasswordResetEmail = async (email) => {
//     try {
//       await auth.sendPasswordResetEmail(email);
//       alert("Password reset link sent!");
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const logout = () => {
//     auth.signOut();
//   };

//   export {
//     auth,
//     db,
//     signInWithEmailAndPassword,
//     registerWithEmailAndPassword,
//     sendPasswordResetEmail,
//     logout,
//   };