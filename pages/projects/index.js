import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from '../../components/layout';
import styled from 'styled-components';

const PageContainer= styled.div`
  border: 1px solid black;
  height: 90vh;
  width: calc(100vw - 225px);
`;

const Title = styled.h1`
  /* border: 1px solid black; */
  margin: 0 25px;
`;

const ProjectsContainer= styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-wrap: wrap;
`;

const Project = styled.div`
  border: 1px solid black;
  margin: 25px;
  border-radius: 5px;
  width: 20vw;
  height: 20vh;
`;

export default function Projects() {
  const [session, loading] = useSession();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/project");
      const json = await res.json();

      if(json.data) {
        const projectTitles = json.data.map(({title, description, status}) => {
          return { title, description, status};
        });

        setProjects(projectTitles);
      }
    }

    fetchData();
  }, [session]);

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
      <PageContainer>
        <Title>Projects</Title>
        <ProjectsContainer>
          {projects.map((project, i) => {
            const link = `/project/${(project.title).replace(" ","-").toLowerCase()}`;
            return (
              <Project key={i}>
                <p><Link href={link}>{project.title}</Link></p>
                <p>{project.description}</p>
                <p>{project.status}</p>
              </Project>
            )
          })}
        </ProjectsContainer>
      </PageContainer>
    </Layout>
  )
}
