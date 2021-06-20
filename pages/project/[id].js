import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/client";
import Layout from '../../components/layout';
import styled from 'styled-components';

const PageContainer= styled.div`
  border: 1px solid black;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const OuterTitleContainer = styled.div`
  border: 1px solid black;
  display: flex;
  height: 80px;
  margin: 0;
  width: 750px;

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

const InnerTitleContainer = styled.div`
  border: 1px solid black;
  margin: auto 0;
  font-size: 40px;
  font-weight: 400;
  width: 750px;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;

  h1 {
    font-size: 34px;
  }
`;

const ProjectContainer= styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  width: 750px;

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

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
    <Layout page={null}>
      <PageContainer>
        <OuterTitleContainer>
          <InnerTitleContainer>
            <h1>{project && project.title ? project.title : ''}</h1>
          </InnerTitleContainer>
        </OuterTitleContainer>
        <ProjectContainer>
          <p>{project && project.description ? project.description : ''}</p>
          {
            project && project.status ? (
              <p>{project.status === 'incomplete' ? 'Not finished' : 'Finished'}</p>
            ) : ''
          }
        </ProjectContainer>
      </PageContainer>
    </Layout>
  )
}

export default Project
