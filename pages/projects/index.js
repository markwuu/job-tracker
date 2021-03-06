import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from '../../components/layout';
import Form from '../../components/Form';
import styled from 'styled-components';
import { useRouter } from 'next/router'

const PageContainer= styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const OuterTitleContainer = styled.div`
  display: flex;
  height: 80px;
  margin: 0;
  width: 900px;

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

const InnerTitleContainer = styled.div`
  margin: auto 0;
  font-size: 40px;
  font-weight: 400;
  width: 600px;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;

  h1 {
    font-size: 34px;
  }
`;

const ProjectsContainer= styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

const ProjectListContainer= styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const Project = styled.div`
  border-radius: 5px;
  margin: 0 0 30px 0;
  width: 600px;
  color: #cad1dc;
  background: #FFFFFF;
  box-shadow: 0 3px 0px 0px;
  height: 125px;
  padding: 0px 20px;
  cursor: pointer;

  a {
    color: black;
  }

  p {
    color: black;
    font-size: 20px;
  }

  &:hover {
      background: #e1e5ea;
  }

  @media (max-width: 890px) {
    height: 100px;
  }
`;

const ActivityLog = styled.div`
  border-radius: 5px;
  height: 435px;
  width: 230px;
  background: #FFFFFF;
  border-radius: 5px;
  margin: 0 0 30px 0;
  color: #cad1dc;
  box-shadow: 0 3px 0px 0px;
  padding: 15px;
  font-size: 20px;

  p {
    color: black;
    font-size: 12px;

    &:before {
      content: "🖥 ";
    }
  }

  h2 {
    color: black;
    font-size: 24px;
    text-align: center;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

const CreateButton = styled.button`
  background: #ff9b7d;
  color: white;
  padding: 10px;
  min-width: 100px;
  text-align: center;
  border-radius: 3.5px;
  font-size: 12px;
  letter-spacing: 0.2px;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  height: 35px;

  &:hover {
    background: #c37058;
  }
`;

const LogEntries = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0 0 15px 0;
  }
`;

export default function Projects() {
  const [session, loading] = useSession();
  const [projects, setProjects] = useState([]);
  const [logs, setLogs] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [formNameValue, setFormNameValue] = useState('');
  const [formDescriptionValue, setFormDescriptionValue] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/project");
      const json = await res.json();
      console.log(json.data);

      if(json.data) {
        const projectData = json.data.projects.map(({title, description, status, slugTitle}) => {
          return { title, description, status, slugTitle };
        });
        setProjects(projectData);

        const logsData = json.data.logs.map(({description}) => {
          return { description };
        });
        setLogs(logsData);
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

  const OpenCreateProjectModal = () => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    setDisplayForm(true);
  }

  const CloseCreateModal = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'visible';
    setDisplayForm(false);
  }

  const PostCreate = async () => {
    const res = await fetch("/api/project", {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formNameValue,
        description: formDescriptionValue
      })
    });

    router.reload();
  }

  const onFormNameChange = (event) => {
    if(formDescriptionValue){
      setDisabledButton(false);
    }
    setFormNameValue(event.target.value);
  }

  const onFormDescriptionChange = (event) => {
    if(formNameValue){
      setDisabledButton(false);
    }
    setFormDescriptionValue(event.target.value)
  }

  return (
    <Layout page={'projects'}>
      { displayForm ?
        <Form
          CloseCreateModal={CloseCreateModal}
          PostCreate={PostCreate}
          formNameValue={formNameValue}
          formDescriptionValue={formDescriptionValue}
          onFormNameChange={onFormNameChange}
          onFormDescriptionChange={onFormDescriptionChange}
          name={'Project Name'}
          description={'Project Description'}
          disabledButton={disabledButton}
        />
      : ''}
      <PageContainer>
        <OuterTitleContainer>
          <InnerTitleContainer>
            <h1>Projects</h1>
            <CreateButton onClick={OpenCreateProjectModal}>Create</CreateButton>
          </InnerTitleContainer>
        </OuterTitleContainer>
        <ProjectsContainer>
          <ProjectListContainer>
            {projects.map((project, i) => {
              const link = `/project/${(project.slugTitle).replace(" ","-").toLowerCase()}`;
              return (
                <Link href={link} style={{color: 'black'}}>
                  <Project key={i}>
                    <p>{project.title}</p>
                    <p>{project.description}</p>
                  </Project>
                </Link>
              )
            })}
          </ProjectListContainer>
          <ActivityLog>
            <h2>Activity Log</h2>
            <LogEntries>
              {logs.map((log, i) => {
                return (
                  <p>{log.description}</p>
                )
              })}
            </LogEntries>
          </ActivityLog>
        </ProjectsContainer>
      </PageContainer>
    </Layout>
  )
}
