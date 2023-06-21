import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  profilePic: string;
}

export const AuthContext = createContext<any>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const storedUser = localStorage.getItem("user");
  const [currentUser, setCurrentUser] = useState<User | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const login = async (inputs: { username: string; password: string }) => {
    const res = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      inputs,
      { withCredentials: true }
    );

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
