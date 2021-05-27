import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";

export default function Projects() {
  const [session, loading] = useSession();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/project");
      const json = await res.json();

      if(json.data) {
        console.log('json', json.data);
        // setProjects(json.data);

        const projectTitles = json.data.map(({title, description, status}) => {
          return { title, description, status};
        })

        setProjects(projectTitles)
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
    <main>
      <h1>Private Projects Overview Page</h1>
      <p>
        {projects.map((project, i) => {
          return (
            <div style={{border:'1px solid black', margin: '25px'}} key={i}>
              <p>{project.title}</p>
              <p>{project.description}</p>
              <p>{project.status}</p>
            </div>
          )
        })}
      </p>
    </main>
  )
}
