import { FC } from "react";

type Props = {
  title?: string | string[];
};

const Header: FC<Props> = (props) => {
  return (
    <header>
      <h1 className="title">
        {props.title ? (
          <span>{props.title}</span>
        ) : (
          <span>Welcome to CLEAN NETWORK</span>
        )}
      </h1>

      <style jsx>{`
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          font-size: 3rem;
          margin-bottom: 25px;
        }
        .title,
        .description {
          text-align: center;
        }
      `}</style>
    </header>
  );
};

export default Header;
