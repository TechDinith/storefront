import { doc, getDoc, setDoc } from "firebase/firestore";
import { status } from "../auth.interface";
import { db } from "./firebase.config";

export const addAnnouncement = async (announcement: string) => {
  try {
    await setDoc(
      doc(db, "announcements", "announcementpedros"),
      { announcement },
      { merge: true }
    );

    return { status: status.success, data: "" };
  } catch (err: any) {
    return { status: status.error, data: err.code };
  }
};

export const getAnnouncementById = async () => {
  try {
    const docRef = doc(db, "announcements", "announcementpedros");
    const docSnap = await getDoc(docRef);

    return { status: "success", data: docSnap };
  } catch (err: any) {
    return { status: "error", data: err.message };
  }
};
