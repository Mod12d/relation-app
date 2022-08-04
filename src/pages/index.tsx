import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";

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

  const nodes = [];
  const links = [];

  if (!data.users) {
    return;
  }

  data.users.forEach((a) => {
    nodes.push({
      id: a.id,
      src: a.profile_image_url,
      name: a.name,
    });

    links.push({
      source: a.id,
      target: a.id + 1,
    });
  });

  return {
    // nodes may be duplicated so use lodash's uniqBy to filter out duplicates
    nodes,
    links,
  };
};

export default function Home() {
  const { loading, error } = useQuery(GET_USER, { variables: { limit: 10 } });
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const { data } = useQuery(GET_USER, {
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
        <NoSSRForceGraph
          graphData={graphData}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const size = 12;
            const img = new Image();
            // img.src = node.profile_image_url
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
