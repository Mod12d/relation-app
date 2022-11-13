import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import Axios from "axios";

import { NodeObject, LinkObject } from "react-force-graph-2d";

type UserNode = NodeObject & {
  name?: string;
  imgUrl?: string;
  imgLoaded?: boolean;
  img?: HTMLImageElement;
};
function handleApi() {
  //console.log("input text >>"+text)
  Axios.get("http://localhost:8000/hello", {}).then(function (res) {
    alert(res.data.message);
  });
}

const NoSSRForceGraph = dynamic(() => import("../lib/NoSSRForceGraph"), {
  ssr: false,
});

const GET_USER = gql`
  query Query {
    users {
      id
      username
      name
      profile_image_url
    }
  }
`;
const formatData = (data) => {
  // this could be generalized but let's leave that for another time

  const nodes: UserNode[] = [];
  const links: LinkObject[] = [];

  if (!data.users) {
    return;
  }

  data.users.forEach((a) => {
    nodes.push({
      id: a?.id,
      name: a?.name,
      imgUrl: a?.profile_image_url,
    });
  });
  for (let i = 1; i < data.users.length; i++) {
    links.push({
      source: data.users[i - 1]?.id,
      target: data.users[i]?.id,
    });
  }
  return {
    // nodes may be duplicated so use lodash's uniqBy to filter out duplicates
    nodes,
    links,
  };
};

export default function Home() {
  const { loading, error } = useQuery(GET_USER);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useQuery(GET_USER, {
    onCompleted: (data) => setGraphData(formatData(data)),
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div className="container">
      <Head>
        <title>Next with Neo4j</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <div></div>
        <NoSSRForceGraph
          nodeAutoColorBy={"__typename"}
          nodeLabel={"id"}
          width={1000}
          height={400}
          graphData={graphData}
          onNodeClick={handleApi}
          nodeCanvasObject={(node: UserNode, ctx) => {
            const size = 12;
            const img = new Image();
            img.src = node.imgUrl;
            ctx.drawImage(
              img,
              node.x - size / 2,
              node.y - size / 2,
              size,
              size
            );
          }}
        />
      </main>

      <Footer />

      <style jsx>{`
        .container {
          width: 100vw;
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        main {
          display: flex;
          width: 100%;
        }
        .subtitle {
          margin-bottom: 25px;
          text-align: center;
        }
        .link {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
