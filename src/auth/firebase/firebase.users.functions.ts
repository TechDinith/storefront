import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
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
import { db, auth } from "./firebase.config";

// export const addUser = async (email: string, role: string) => {
//   try {
//     const docRef = await addDoc(collection(db, "admins"), {
//       assignedDate: new Date().toLocaleString(),
//       email: email,
//       role: role,
//     });

//     return docRef;
//   } catch (e) {
//     return e;
//   }
// };

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

// export const logInAdmins = async (email: string) => {
//   const password = "Pedros@2022";

//   return await signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       return user;
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;

//       return { errorCode, errorMessage };
//     });
// };

export const deleteAUser = async (id: string) => {
  return await getUserById(id).then((userDoc: any) => {
    if (userDoc.data.authId === auth.currentUser!.uid) {
      const user = auth.currentUser;
      return { message: "Your account is Banned!", severity: "error" };
    } else {
      return deleteDoc(doc(db, "users", "1212"))
        .then(() => {
          return { message: "User Deleted!", severity: "success" };
        })
        .catch((err) => {
          return { message: err.message, severity: "error" };
        });
    }
  });
};
