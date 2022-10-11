import { FC, ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

type Body = {
  children: ReactNode;
  inView?: boolean;
};

export const Layout: FC<Body> = (props) => {
  const { inView } = useInView({ threshold: 0 });
  const router = useRouter();
  const root = router.asPath === "/";
  return (
    <div className="flex min-h-screen flex-col text-white">
      <Header inView={inView} />
      <div
        className={`mx-auto flex min-w-full grow flex-col justify-start bg-green-900/50 ${root} ? "" : "max-w-7xl px-4"
        }`}
      >
        {props.children}
      </div>
      <Footer />
    </div>
  );
};
