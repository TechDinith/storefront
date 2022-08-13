import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { completeEmailLink } from "../../../auth/firebase/auth.email.link";

export default function Landing() {
  const navigate = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const role = urlParams.get("role") as string;

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(role);
        navigate("/admin/dashboard", { state: { role: role } });
      } else {
        completeEmailLink().then((result) => {
          if (result) {
            if (String(result.code) === String("auth/invalid-action-code")) {
              navigate("/admin/7d6c0b0812448ea062273e795dcca45a1861260b", {
                state: { role: role },
              });
            } else if (result.user) {
              console.log(result);
              navigate("/admin/dashboard", { state: { role: result.role } });
            }
          } else {
            navigate("/notfound");
          }
        });
      }
    });
  }, []);

  return <></>;
}
