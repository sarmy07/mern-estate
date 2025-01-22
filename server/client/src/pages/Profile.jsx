import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  useDeleteUserMutation,
  useLogoutUserMutation,
  useUpdateUserMutation,
} from "../redux/features/user/userApi";
import { logout, setUser } from "../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [logoutUser] = useLogoutUserMutation();
  // console.log(file);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        // console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser({
        id: user?._id,
        ...formData,
      }).unwrap();
      dispatch(setUser({ user: response }));
      alert("User updated successfully");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteUser(id).unwrap();
      alert("User Deleted!");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      dispatch(logout());
      alert("Logged out successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl my-7 font-semibold text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="self-center flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData?.avatar || user?.avatar}
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full self-center mt-2"
          alt=""
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-500">
              Error uploading image (image must be less than 2 (mb)){" "}
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc} %`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image uplaod success</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="Username"
          id="username"
          defaultValue={user?.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className="border p-3 rounded-lg"
          placeholder="Email"
          id="email"
          defaultValue={user?.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="border p-3 rounded-lg"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />

        {error && <p className="text-red-700 text-center">{error.data}</p>}

        <button
          disabled={isLoading}
          className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Updating" : "Update"}
        </button>

        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white uppercase p-3 text-center rounded-lg hover:opacity-95"
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between my-5">
        <span
          onClick={() => handleDelete(user?._id)}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleLogout} className="text-red-700 cursor-pointer">
          Log out
        </span>
      </div>
    </div>
  );
}
