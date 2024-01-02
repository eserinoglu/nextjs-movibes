"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContextProvider;
