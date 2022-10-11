/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { CSSProperties } from "react";
// import { Navigation, NavMobile } from "src/layout/navigation";
// import { SigninPopover } from "src/component/auth";

type Props = {
  inView: boolean;
  className?: CSSProperties;
};

export const Header = ({ inView }: Props) => {
  return (
    <div className="sticky top-0 z-50 items-baseline">
      <div
        className={`lg:px-46 flex items-center justify-between py-5 px-4 leading-10 ${
          inView ? `` : "top-[0] flex bg-slate-50/60"
        }`}
      >
        {/* <NavMobile /> */}
        <Link href="/">
          <span className="bg-gradient-to-r from-green-600 to-violet-900 bg-clip-text font-mono text-xl font-bold tracking-widest text-transparent">
            グラフ管理アプリ
          </span>
        </Link>
        <div className="flex leading-6">
          <div className="hidden sm:block">{/* <Navigation /> */}</div>
          {/* <SigninPopover /> */}
        </div>
      </div>
    </div>
  );
};
