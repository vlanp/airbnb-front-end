import { Slot, router, useSegments } from "expo-router";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useContext, useEffect } from "react";

const RootLayout = () => {
  return <AuthProvider>{<SlotProvider />}</AuthProvider>;
};

const SlotProvider = () => {
  const authContext = useContext(AuthContext);
  const auth = authContext?.auth;

  const location = useSegments();

  useEffect(() => {
    if (!auth && location[0] !== "(auth)") {
      router.replace("/");
    }

    // if (auth && location[0] !== "(app)") {
    //   router.replace("/...");
    // }
  }, [auth, location]);

  return <Slot />;
};

export default RootLayout;
