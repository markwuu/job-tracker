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
        // console.log('json', json);
        // setProjects(json.data);

        const projectTitles = json.data.map((project) => {
          return project.title;
        })

        console.log('projectTitles', projectTitles)
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
        {projects.map(project => {
          return (
            <li>{project}</li>
          )
        })}
      </p>
    </main>
  )
}
