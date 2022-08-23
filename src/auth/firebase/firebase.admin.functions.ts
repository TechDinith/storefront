import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
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
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase.config";

export const addAdmin = async (email: string, role: string) => {
  try {
    const docRef = await addDoc(collection(db, "admins"), {
      assignedDate: new Date().toLocaleString(),
      email: email,
      role: role,
    });

    return docRef;
  } catch (e) {
    return e;
  }
};

export const updateAdmin = async (refId: string, data: any) => {
  const adminRef = doc(db, "admins", refId);

  await updateDoc(adminRef, data)
    .then(() => {
      //  console.log("updated")
    })
    .catch((err) => {
      //  console.log(err)
    });
};

export const createAdminAuth = async (email: string) => {
  const password = "Pedros@2022";

  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    });
};

export const getAdmins = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "admins"));

    return querySnapshot;
  } catch (err) {
    return err;
  }
};

export const getAdminsByUid = async (id: string) => {
  try {
    // Create a reference to the cities collection
    const adminRef = collection(db, "admins");

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

export const logInAdmins = async (email: string) => {
  const password = "Pedros@2022";

  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return { errorCode, errorMessage };
    });
};

export const getAdminById = async (id: string) => {
  const docRef = doc(db, "admins", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { data: docSnap.data() };
  } else {
    return { err: "No such doc" };
  }
};

export const deleteAdmins = async (id: string) => {
  return await getAdminById(id).then((userDoc: any) => {
    if (userDoc.data.authId === auth.currentUser!.uid) {
      // const user = auth.currentUser;
      return { message: "You can't delete Yourself!", severity: "error" };
    } else {
      return deleteDoc(doc(db, "admins", id))
        .then(() => {
          return { message: "Admin Deleted!", severity: "success" };
        })
        .catch((err) => {
          return { message: err.message, severity: "error" };
        });
    }
  });
};

export const deleteCurrentAdmin = async () => {
  const user = auth.currentUser;

  return await deleteUser(user as any)
    .then(() => {
      // console.log("del");
    })
    .catch((error) => {
      // console.log(error);
    });
};
