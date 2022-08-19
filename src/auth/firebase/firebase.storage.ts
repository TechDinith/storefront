import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "./firebase.config";

const storageRef = ref(storage);

const imagesRef = ref(storageRef, "images/products");

export const uploadImagesToStorage = async (file: any) => {
  const uploadedType = file.type.split("/");

  const imageName = file.uid + "." + uploadedType[1];
  const fileRef = ref(imagesRef, imageName);

  return await uploadBytes(fileRef, file)
    .then((snapshot) => {
      return { status: "ok", res: snapshot };
    })
    .catch((err) => {
      return { status: "error", res: err };
    });
};

export const deleteImageFromStorage = (file: any) => {
  if (file && file.type) {
    const uploadedType = file.type.split("/");

    const imageName = "images/products/" + file.uid + "." + uploadedType[1];

    const desertRef = ref(storage, imageName);

    deleteObject(desertRef)
      .then(() => {
        console.log("imageName", imageName);
      })
      .catch((error) => {
        console.log("err", error);
      });
  } else {
    const imageName = "images/products/" + file;

    const desertRef = ref(storage, imageName);

    deleteObject(desertRef)
      .then(() => {
        console.log("imageName", imageName);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }
};

export const handleImageUrl = async (imageName: string) => {
  try {
    const url = await getDownloadURL(ref(imagesRef, imageName));
    return url;
  } catch (error) {
    console.log("error", error);
    return "images/acc.jpg";
  }
};
