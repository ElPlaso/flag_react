import React, { useContext } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const ProfileContext = React.createContext();

export function ProfileProvider({ children }) {
  async function updateProfileDetails(displayName, flagCode, uid) {
    await setDoc(doc(db, "profiles", uid), {
      display_name: displayName,
      flag_code: flagCode,
    });
  }

  async function getProfileDetails(uid) {
    const docRef = doc(db, "profiles", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  }

  const value = {
    updateProfileDetails,
    getProfileDetails,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfileContext() {
  return useContext(ProfileContext);
}
