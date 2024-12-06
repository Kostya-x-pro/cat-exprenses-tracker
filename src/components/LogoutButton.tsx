import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const LogoutButton: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Пользователь вышел");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Выйти
    </button>
  );
};

export default LogoutButton;
