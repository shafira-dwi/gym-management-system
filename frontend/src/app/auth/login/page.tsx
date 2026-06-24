"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { users } from "@/data/users";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const user = users.find((item) => item.username === username && item.password === password);

    if (!user) {
      alert("Username atau password salah");
      return;
    }

    switch (user.role) {
      case "admin":
        router.push("/admin");
        break;

      case "pt":
        router.push("/pt");
        break;

      case "marketing":
        router.push("/marketing");
        break;
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-wrapper">
          <div className="gym-logo">GYM</div>
          <h1>Gym Management</h1>

          <p>Manage your gym easier</p>
        </div>

        <div className="input-group">
          <label>Username</label>
          <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Password</label>

          <div className="password-box">
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                // eyes closed
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" />

                  <path d="M10.5 10.5a2 2 0 003 3" stroke="currentColor" strokeWidth="2" />

                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              ) : (
                // eyes open
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="2" fill="none" />

                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              )}
            </button>
          </div>
          <div className="remember">
            <label>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember login
            </label>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
