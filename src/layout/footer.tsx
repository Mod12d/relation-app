import Link from "next/link";

export const Footer = () => {
  return (
    <div className="my-4 flex max-h-6 justify-around font-mono text-sm sm:my-12">
      <Link href={"/"}>
        <a className="whitespace-nowrap bg-gradient-to-r from-green-900 to-violet-900 bg-clip-text  text-transparent">
          {`© ${new Date().getFullYear()}`} グラフ管理アプリ
        </a>
      </Link>
      <Link href={"/policy"}>
        <a className="whitespace-nowrap bg-gradient-to-r from-green-600 to-violet-900 bg-clip-text font-mono text-sm text-transparent">
          policy / privacy
        </a>
      </Link>
    </div>
  );
};
