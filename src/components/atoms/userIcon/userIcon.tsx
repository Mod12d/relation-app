import { NextPage } from "next";
import React from "react";
import Lottie from "lottie-react";
import userAnimationIcon from "./108599-insurance.json";

export const UserIcon: NextPage = () => {
  return (
    <div className="h-8 w-8 rounded-full">
      <Lottie animationData={userAnimationIcon} autoPlay={true} loop={false} />
    </div>
  );
};
