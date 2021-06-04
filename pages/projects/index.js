import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from '../../components/layout';
import styled from 'styled-components';

const PageContainer= styled.div`
  /* border: 1px solid black; */
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  /* border: 1px solid black; */
  display: flex;
  height: 80px;
  margin: 0;
  width: 900px;
`;

const ProjectsContainer= styled.div`
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
  width: 900px;
`;

const ProjectListContainer= styled.div`
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 600px;
`;

const Project = styled.div`
  /* border: 2px solid blue; */
  border-radius: 5px;
  margin: 0 0 30px 0;
  width: 600px;
  color: #cad1dc;
  background: #FFFFFF;
  box-shadow: 0 3px 0px 0px;
  height: 125px;
  padding: 0px 20px;

  a {
    color: black;
  }

  p {
    color: black;
  }
`;

const ActivityLog = styled.div`
  /* border: 2px solid red; */
  border-radius: 5px;
  height: 435px;
  width: 200px;
  background: #FFFFFF;
  border-radius: 5px;
  margin: 0 0 30px 0;
  color: #cad1dc;
  box-shadow: 0 3px 0px 0px;
  padding: 15px;
  text-align: center;
  font-size: 20px;

  p {
    color: black;
  }
`;

export default function Projects() {
  const [session, loading] = useSession();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/project");
      const json = await res.json();

      if(json.data) {
        const projectTitles = json.data.map(({title, description, status, slugTitle}) => {
          return { title, description, status, slugTitle };
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
        <Title>
          <div style={{margin: 'auto 0', fontSize: '40px', fontWeight: '400'}}>Projects</div>
        </Title>
        <ProjectsContainer>
          <ProjectListContainer>
            {projects.map((project, i) => {
              const link = `/project/${(project.slugTitle).replace(" ","-").toLowerCase()}`;
              return (
                <Project key={i}>
                  <p style={{ fontSize: '20px'}}>
                    <Link href={link} style={{color: 'black'}}>{project.title}</Link>
                  </p>
                  <p style={{}}>
                    {project.description}
                  </p>
                  {/* <p style={{textAlign:'center'}}>{project.status}</p> */}
                </Project>
              )
            })}
          </ProjectListContainer>
          <ActivityLog>
            <p>Activity Log</p>
          </ActivityLog>
        </ProjectsContainer>
      </PageContainer>
    </Layout>
  )
}
