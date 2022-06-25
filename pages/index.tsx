import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'
import dynamic from 'next/dynamic';
import Header from '../components/header'
import Footer from '../components/footer'
import { useState } from 'react';


const NoSSRForceGraph = dynamic(() => import('../lib/NoSSRForceGraph'), {
  ssr: false
});

const GET_MOVIES = gql`
  query GetMovies {
    getMovies {
      title
      tagline
      released
      actors {
        name
      }
      directors {
        name
      }
    }
  }
`
const formatData = (data) => {
  // this could be generalized but let's leave that for another time

  const nodes = [];
  const links = [];

  if (!data.getMovies) {
    return;
  }

  data.getMovies.forEach((a) => {
    nodes.push({
      id: a.id,
      url: a.url,
      title: a.title
    });

    links.push({
      source: a.actors.name,
      target: a.id
    });

  });

  return {
    // nodes may be duplicated so use lodash's uniqBy to filter out duplicates
    nodes,
    links
  };
};

export default function Home() {
  const { loading, error } = useQuery(GET_MOVIES)
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  const { data } = useQuery(GET_MOVIES, {
    onCompleted: (data) => setGraphData(formatData(data))
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
      nodeLabel={(node) => {
        return node.title;
      }}
      nodeRelSize={8}
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

        table {
          width: 100%;
          border: 1px solid #dee2e6;
          border-collapse: collapse;
          border-spacing: 2px;
        }

        table thead th {
          vertical-align: middle;
          border-bottom: 2px solid #dee2e6;
          border: 1px solid #dee2e6;
          border-bottom-width: 2px;
          padding: 0.75rem;
        }

        .link {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
