import React from "react";
import { useUser } from "../UserContext";

const LoginModal = ({ closeModal }) => {
  const { loginAsGuest } = useUser();

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        <button onClick={loginAsGuest} className="btn">
          Login as Guest
        </button>
        <button onClick={closeModal} className="btn-close">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
