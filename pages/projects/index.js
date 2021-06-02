import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from '../../components/layout';
import styled from 'styled-components';

const PageContainer= styled.div`
  height: 90vh;
`;

const ActivityLog = styled.div`
  border: 1px solid purple;
  margin: 0 0 110px 0;
  width: 280px;
`;

const ProjectsContainer= styled.div`
  border: 1px solid black;
  display: flex;
  height: 80vh;
  justify-content: space-evenly;
`;
const ProjectListContainer= styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 0 80px 0;
  width: 700px;
`;

const Project = styled.div`
  border: 1px solid blue;
  border-radius: 5px;
  /* height: 200px; */
  margin: 0 0 30px 0;
  width: 200px;
`;

const Title = styled.h1`
  border: 0px solid red;
  height: 10vh;
  margin: 0;
  padding: 0 25px;
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
          <ProjectListContainer>
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
          </ProjectListContainer>
          <ActivityLog>Activity Log</ActivityLog>
        </ProjectsContainer>
      </PageContainer>
    </Layout>
  )
}
