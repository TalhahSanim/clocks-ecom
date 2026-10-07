// import {
//   collection,
//   query,
//   where,
//   getDoc,
//   addDoc,
//   getDocs,
// } from "firebase/firestore";

import { db } from "../firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
// import bcrypt from "bcryptjs";

import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

// const usersRef = collection(db, "users");
// const SALT_ROUNDS = 10;

async function getAdminFlag(uid) {
  const snapshot = await getDoc(doc(db, "users", uid));
  if (!snapshot.exists()) {
    return false;
  }
  return snapshot.data().admin === true;
}

export async function registerUser(name, email, password) {
  //!old login system
  // const existing = await getDocs(query(usersRef, where("email", "==", email)));

  // if (!existing.empty) {
  //   throw new Error("An account with that email already exists.");
  // }

  // // const newDoc = await addDoc(usersRef, { name, email, password });
  // const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  // const newDoc = await addDoc(usersRef, {
  //   name,
  //   email,
  //   password: hashedPassword,
  // });
  // return { id: newDoc.id, name, email };
  // }

  // get snap shot of user document

  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(credential.user, { displayName: name });

  await setDoc(doc(db, "users", credential.user.uid), {
    name,
    email: credential.user.email,
    admin: false,
  });

  return {
    id: credential.user.uid,
    name,
    email: credential.user.email,
    admin: false,
  };
}

//login

export async function loginUser(email, password) {
  // // ! const matching = await getDocs(
  // //   query(
  // //     usersRef,
  // //     where("email", "==", email),
  // //     where("password", "==", password),
  // //   ),
  // // );
  // const matching = await getDocs(query(usersRef, where("email", "==", email)));

  // if (matching.empty) {
  //   throw new Error("User does not exist or wrong password");
  // }
  // const userDoc = matching.docs[0];
  // const userData = userDoc.data();

  // const passwordMatches = await bcrypt.compare(password, userData.password);
  // if (!passwordMatches) {
  //   throw new Error("Incorrect Password");
  // }

  // return { id: userData.id, name: userData.name, email: userData.email };

  const credential = await signInWithEmailAndPassword(auth, email, password);
  const { uid, displayName, email: userEmail } = credential.user;
  const admin = await getAdminFlag(uid);

  return { id: uid, name: displayName, email: userEmail, admin };
}

export async function logoutUser() {
  await signOut(auth);
}
