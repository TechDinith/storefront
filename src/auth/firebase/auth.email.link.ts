import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

export const signInWIthFirebaseEmailLink = async (
  email: string,
  role: string
) => {
  const auth = getAuth();

  const actionCodeSettings = {
    url: "http://localhost:3000/admin/landing?role=" + role,
    handleCodeInApp: true,
    // iOS: {
    //   bundleId: "com.example.ios",
    // },
    // android: {
    //   packageName: "com.example.android",
    //   installApp: true,
    //   minimumVersion: "12",
    // },
    // dynamicLinkDomain: "example.page.link",
  };

  return await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then((result) => {
      window.localStorage.setItem("emailForSignIn", email);
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", error);
      return errorMessage;
    });
};

export const completeEmailLink = async () => {
  const auth: any = getAuth();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }

    return await signInWithEmailLink(
      auth,
      email as string,
      window.location.href
    )
      .then((result) => {
        console.log(result);
        window.localStorage.removeItem("emailForSignIn");
        return { user: result.user, role: urlParams.get("role") as string };
      })
      .catch((error) => {
        return error;
      });
  }
};
