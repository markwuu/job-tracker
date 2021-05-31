import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Layout from '../../components/layout';

export default function Algorithms() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/algorithm");
      const json = await res.json();

      if(json.content) {
        setContent(json.content);
      }
    }

    fetchData();
  }, [session]);

  if( typeof window !== "undefined" && loading) return null;

  if(!session) {
    return (
      <main>
        <div>
          <h1>You arent signed in, please sign in first</h1>
        </div>
      </main>
    )
  }

  return (
    <Layout page={'algorithms'}>
      <h1>Private Algorithms Overview Page</h1>
      <p>
        {content}
      </p>
    </Layout>
  )
}
