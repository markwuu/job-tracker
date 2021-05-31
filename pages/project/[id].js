import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/client";
import Layout from '../../components/layout';

const Project = () => {
  const router = useRouter()
  const { id } = router.query
  const [session, loading] = useSession();
  const emptyProject = {title: '', description: '', status: ''};
  const [project, setProject] = useState(emptyProject);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/project/${id}`);
      const json = await res.json();

      if(json.data) {
        setProject(json.data[0])
      }
    }

    fetchData();
  }, [session, id, setProject]);

  if( typeof window !== "undefined" && loading) return null;

  if(!session) {
    return (
      <>
        <h1>You arent signed in, please sign in first</h1>
      </>
    )
  }

  return (
    <Layout page={'projects'}>
      <h1>{project && project.title ? project.title : `No project found with title ${id}`}</h1>
      <p>{project && project.description ? project.description : ''}</p>
      {
        project && project.status ? (
          <p>{project.status === 'incomplete' ? 'Not finished' : 'Finished'}</p>
        ) : ''
      }
    </Layout>
  )
}

export default Project
