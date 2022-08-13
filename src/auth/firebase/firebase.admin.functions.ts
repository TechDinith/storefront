import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.config";

export const addAdmin = async (email: string, role: string) => {
  try {
    const docRef = await addDoc(collection(db, "admins"), {
      assignedDate: new Date(),
      email: email,
      role: role,
    });

    return docRef;
  } catch (e) {
    return e;
  }
};

export const getAdmins = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "admins"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    return querySnapshot;
  } catch (err) {
    return err;
  }
};
