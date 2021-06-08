import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from '../../components/layout';
import Form from '../../components/Form';
import styled from 'styled-components';
import { useRouter } from 'next/router'

const PageContainer= styled.div`
  /* border: 1px solid black; */
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const OuterTitleContainer = styled.div`
  /* border: 1px solid black; */
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
  /* border: 1px solid black; */
  height: 80px;
  align-items: center;

  h1 {
    font-size: 34px;
  }
`;

const ProjectsContainer= styled.div`
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
  width: 900px;

  @media (max-width: 1200px) {
    width: 600px;
  }
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

  @media (max-width: 890px) {
    height: 100px;
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

export default function Projects() {
  const [session, loading] = useSession();
  const [projects, setProjects] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [formNameValue, setFormNameValue] = useState('');
  const [formDescriptionValue, setFormDescriptionValue] = useState('');
  const router = useRouter();

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

  const OpenCreateProjectModal = () => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    setDisplayForm(true);
  }

  const CloseCreateProjectModal = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'visible';
    setDisplayForm(false);
  }

  const PostCreateProject = async () => {
    console.log('postcreateporject hit')
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
    setFormNameValue(event.target.value)
  }

  const onFormDescriptionChange = (event) => {
    setFormDescriptionValue(event.target.value)
  }

  return (
    <Layout page={'projects'}>
      { displayForm ?
        <Form
          CloseCreateProjectModal={CloseCreateProjectModal}
          PostCreateProject={PostCreateProject}
          formNameValue={formNameValue}
          formDescriptionValue={formDescriptionValue}
          onFormNameChange={onFormNameChange}
          onFormDescriptionChange={onFormDescriptionChange}
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
