import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useVerifyGoogleMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyGoogle] = useVerifyGoogleMutation();
  const handleGoogleClick = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      //   console.log(result);
      const user = result.user;

      const { displayName, email, photoURL } = user;

      const response = await verifyGoogle({
        displayName,
        email,
        photoURL,
      }).unwrap();

      if (response) {
        console.log(response);
        dispatch(setUser({ user: response }));
        navigate("/");
      }
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}
