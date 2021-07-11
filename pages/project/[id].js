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
  height: calc(100vh - 80px);
  justify-content: center;
`;

const Container= styled.div`
  border: 1px solid black;
  min-height: 500px;
  min-width: 250px;
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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid yellow;
  min-height: 500px;
  min-width: 250px;

  label {
    border: 1px solid black;
  }
`;

const Project = () => {
  const router = useRouter()
  const { id } = router.query
  const [session, loading] = useSession();
  const emptyProject = {title: '', description: '', status: ''};
  const [project, setProject] = useState(emptyProject);
  const [projectId, setProjectId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState(null);
  const [websiteLink, setWebsiteLink] = useState(null);
  const [status, setStatus] = useState(null);
  const [imageLink, setImageLink] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const [editStatus, setEditStatus] = useState(false);

  console.log('project', project);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/project/${id}`);
      const json = await res.json();

      if(json.data[0]) {
        setProject(json.data[0])
        setProjectId(json.data[0]._id);
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

  const onFormTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const onFormDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const onFormGithubLinkChange = (event) => {
    setGithubLink(event.target.value)
  }

  const onFormWebsiteLinkChange = (event) => {
    setWebsiteLink(event.target.value)
  }

  const onFormStatusChange = (event) => {
    setStatus(event.target.value)
  }

  const onFormImageLinkChange = (event) => {
    setImageLink(event.target.value)
  }

  const onFormVideoLinkChange = (event) => {
    setVideoLink(event.target.value)
  }

  const updateProject = async () => {
    const res = await fetch(`/api/project/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        id: projectId,
        title: title,
        description: description,
        github: githubLink,
        website: websiteLink,
        status: status,
        image: imageLink,
        video: videoLink
      })
    });

    const json = await res.json();
    console.log('json', json);
    router.reload();
  }

  const displayEditForm = () => {
    setEditStatus(true);
  }

  const displayProjectCard = () => {
    setEditStatus(false);
  }

  return (
    <Layout page={null}>
      <PageContainer>
        {
          !editStatus ? (
            <Container>
              <OuterTitleContainer>
                <InnerTitleContainer>
                  <h1>{project && project.title ? project.title : ''}</h1>
                  <button onClick={displayEditForm}>Edit</button>
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
            </Container>
          ) : (
            <Form>
              <div>
                Update project
              </div>
              <label>
                  title
              </label>
              <input type="text" name="name" value={title} onChange={onFormTitleChange}/>

              <label>
                  description
              </label>
              <input type="text" name="description" value={description} onChange={onFormDescriptionChange}/>
              <label>
                  github
              </label>
              <input type="text" name={githubLink} value={githubLink} onChange={onFormGithubLinkChange}/>
              <label>
                  website
              </label>
              <input type="text" name={websiteLink} value={websiteLink} onChange={onFormWebsiteLinkChange}/>
              <label>
                  status
              </label>
              <input type="text" name={status} value={status} onChange={onFormStatusChange}/>
              <label>
                  image
              </label>
              <input type="text" name={imageLink} value={imageLink} onChange={onFormImageLinkChange}/>
              <label>
                  video
              </label>
              <input type="text" name={videoLink} value={videoLink} onChange={onFormVideoLinkChange}/>
              <input type="submit" value="Submit" onClick={updateProject} />
              <button onClick={displayProjectCard}>Cancel</button>
            </Form>
          )
        }
      </PageContainer>
    </Layout>
  )
}

export default Project
