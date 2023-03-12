import React, { useState } from "react";
import { useRouter, useSegments } from "expo-router";

import { getItem } from "../lib/expo-secure-store";

type AuthContextType = {
  addUser: (user: string) => void;
  removeUser: () => void;
  user: string | null;
};

const initialContext: AuthContextType = {
  addUser: () => {
    // Maybe we should throw an error here?
    console.warn("Add user not set");
  },
  removeUser: () => {
    // Maybe we should throw an error here?
    console.warn("Remove user not set");
  },
  user: null,
};

const AuthContext = React.createContext<AuthContextType>(initialContext);

// This hook can be used to access the user info.
export const useAuth = () => {
  return React.useContext(AuthContext);
};

// This hook will protect the route access based on user authentication.
const useProtectedRoute = (user: string | null) => {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setAuth] = useState<string | null>(null);

  getItem("current-user").then((user) => {
    if (user != null) {
      setAuth(user);
    }
  });

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        addUser: (user: string) => setAuth(user),
        removeUser: () => setAuth(null),
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
