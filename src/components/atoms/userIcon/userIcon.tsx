import { NextPage } from "next";
import React from "react";
import Lottie from "lottie-react";
import userAnimationIcon from "./108599-insurance.json";

type Props = {};

export const UserIcon: NextPage<Props> = (props) => {
  return (
    <div className="h-8 w-8 rounded-full">
      <Lottie animationData={userAnimationIcon} autoPlay={true} loop={false} />
    </div>
  );
};
