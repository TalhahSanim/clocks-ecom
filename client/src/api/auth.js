import { db } from "../firebase";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
// import bcrypt from "bcryptjs";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

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
  // get snap shot of user document

  const credential = await createUserWithEmailAndPassword(auth, email, password);
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
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const { uid, displayName, email: userEmail } = credential.user;
  const admin = await getAdminFlag(uid);

  return { id: uid, name: displayName, email: userEmail, admin };
}

export async function logoutUser() {
  await signOut(auth);
}
