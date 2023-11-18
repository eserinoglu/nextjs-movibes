import React from "react";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Profile() {
  return (
    <div className="w-full md:w-5/6 md:ml-auto px-3 md:px-10 flex flex-col gap-3 mb-10">
      <UserProfile
        appearance={{
          baseTheme: dark,
          variables: { colorPrimary: "rgba(61, 210, 204, 0.75)" },
        }}
      />
    </div>
  );
}
