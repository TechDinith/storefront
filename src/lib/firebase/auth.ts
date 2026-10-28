import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(name: string, email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (name) await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, "users", cred.user.uid), {
    name,
    email,
    role: "customer",
    createdAt: serverTimestamp(),
  });
  return cred;
}

export async function signOut() {
  return fbSignOut(auth);
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email, {
    url: process.env.NEXT_PUBLIC_SITE_URL + "/auth/login",
  });
}
