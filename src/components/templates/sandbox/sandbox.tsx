import { handleImageUrl } from "../../../auth/firebase/firebase.storage";

const SandBox = () => {
  return (
    <>
      {handleImageUrl("rc-upload-1660734696420-17.jpeg").then((url: string) =>
        console.log(url)
      )}
    </>
  );
};

export default SandBox;
