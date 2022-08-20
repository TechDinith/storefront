import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { iSignUpUser, status } from "../auth.interface";
import { db, auth } from "./firebase.config";

export const addUser = async (email: string, name: string, id: string) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      joinedDate: new Date().toLocaleString(),
      email: email,
      name: name,
      authId: id,
    });

    return docRef;
  } catch (e) {
    return e;
  }
};

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    return querySnapshot;
  } catch (err) {
    return err;
  }
};

export const getUserByUid = async (id: string) => {
  try {
    // Create a reference to the cities collection
    const adminRef = collection(db, "users");

    // Create a query against the collection.
    const q = query(adminRef, where("authId", "==", id));

    const querySnapshot = await getDocs(q);
    let user: any;
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    return user;
  } catch (err) {
    return err;
  }
};

export const getUserById = async (id: string) => {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { data: docSnap.data() };
  } else {
    return { err: "No such doc" };
  }
};

export const logInUsers = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    return { status: status.success, data: user };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return { status: status.error, data: { errorCode, errorMessage } as any };
  }
};

export const signupUsers = async ({ email, password, name }: iSignUpUser) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateProfile(auth.currentUser as any, {
      displayName: name,
    })
      .then(() => {
        addUser(email, name, user.uid).then((res) => console.log(res));
      })
      .catch((error) => {
        console.log(error);
      });

    return { status: status.success, data: user };
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { status: status.error, data: { errorCode, errorMessage } as any };
  }
};

export const deleteAUser = async (id: string) => {
  return await getUserById(id).then((userDoc: any) => {
    //modification needed if authid not in the users table this should delete the user
    if (userDoc.data.authId === auth.currentUser!.uid) {
      // const user = auth.currentUser;
      // return { message: "Your account is Banned!", severity: "error" };
    } else {
      return deleteDoc(doc(db, "users", id))
        .then(() => {
          return { message: "User Deleted!", severity: "success" };
        })
        .catch((err) => {
          return { message: err.message, severity: "error" };
        });
    }
  });
};

export const userLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("out");
    })
    .catch((error) => {
      console.log(error);
    });
};
