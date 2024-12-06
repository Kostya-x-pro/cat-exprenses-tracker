import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Ошибка при авторизации:", error);
    }
  };

  return (
    <div className="text-center mt-5">
      <button className="btn btn-primary" onClick={handleLogin}>
        Войти в приложение
      </button>
    </div>
  );
};

export default Login;
