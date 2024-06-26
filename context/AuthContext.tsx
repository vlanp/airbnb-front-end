import { ReactNode, createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<IAuthContext | null>(null);

interface IAuth {
  id: string;
  token: string;
}

interface IAuthContext {
  auth: IAuth | null;
  saveAuth: (auth: IAuth) => void;
  removeAuth: () => void;
}

const isIAuth = (obj: object): obj is IAuth => {
  return "id" in obj && "token" in obj;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<IAuth | null>(null);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const storedStringAuth = await AsyncStorage.getItem("auth");

        if (!storedStringAuth) {
          return;
        }

        const parsedAuth = JSON.parse(storedStringAuth);

        if (!(parsedAuth instanceof Object) || !isIAuth(parsedAuth)) {
          return;
        }

        setAuth(parsedAuth);
      } catch (error) {
        console.log("Can't access async storage: ", error);
      }
    };

    loadAuth();
  }, []);

  const saveAuth = async (auth: IAuth) => {
    try {
      setAuth(auth);
      const stringAuth = JSON.stringify(auth);
      await AsyncStorage.setItem("auth", stringAuth);
    } catch (error) {
      console.log("Can't save in async storage: ", error);
    }
  };

  const removeAuth = async () => {
    try {
      setAuth(null);
      await AsyncStorage.removeItem("auth");
    } catch (error) {
      console.log("Can't remove from async storage: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, removeAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
