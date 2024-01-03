"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const getUserData = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();
      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserData = async (displayName) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ display_name: displayName })
        .eq("id", user?.id)
        .select();
      if (error) throw error;
      setUserData(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, userData, updateUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

export default UserContextProvider;
