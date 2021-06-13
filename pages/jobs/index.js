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

const JobsContainer= styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

const JobsListContainer= styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const Job = styled.div`
  border-radius: 5px;
  width: 600px;
  color: #cad1dc;
  background: #FFFFFF;
  box-shadow: 0 3px 0px 0px;
  height: 64px;
  padding: 0px 20px;
  margin: 0 0 25px 0;
  display: flex;
  justify-content: space-between;
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

export default function Jobs() {
  const [session, loading] = useSession();
  const [jobs, setJobs] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [formCompanyValue, setFormCompanyValue] = useState('');
  const [formDescriptionValue, setFormDescriptionValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/job");
      const json = await res.json();
      console.log(json.data);

      if(json.data) {
        const jobs = json.data.map(({company, description, slugTitle}) => {
          return { company, description, slugTitle };
        });

        setJobs(jobs);
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

  const OpenCreateModal = () => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    setDisplayForm(true);
  }

  const CloseCreateModal = () => {
    document.body.style.height = 'auto';
    document.body.style.overflow = 'visible';
    setDisplayForm(false);
  }

  const PostCreateJob = async () => {
    const res = await fetch("/api/job", {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company: formCompanyValue,
        description: formDescriptionValue
      })
    });

    router.reload();
  }

  const onFormNameChange = (event) => {
    setFormCompanyValue(event.target.value)
  }

  const onFormDescriptionChange = (event) => {
    setFormDescriptionValue(event.target.value)
  }

  return (
    <Layout page={'jobs'}>
      { displayForm ?
        <Form
          CloseCreateModal={CloseCreateModal}
          PostCreate={PostCreateJob}
          formNameValue={formCompanyValue}
          formDescriptionValue={formDescriptionValue}
          onFormNameChange={onFormNameChange}
          onFormDescriptionChange={onFormDescriptionChange}
          name={'Company Name'}
          description={'Company Position'}
        />
      : ''}
      <PageContainer>
        <OuterTitleContainer>
          <InnerTitleContainer>
            <h1>Jobs</h1>
            <CreateButton onClick={OpenCreateModal}>Create</CreateButton>
          </InnerTitleContainer>
        </OuterTitleContainer>
        <JobsContainer>
          <JobsListContainer>
            {jobs.map((job, i) => {
              const link = `/job/${(job.slugTitle).replace(" ","-").toLowerCase()}`;
              return (
                <Link href={link} style={{color: 'black'}}>
                  <Job key={i}>
                    <p>{job.company}</p>
                    <p>{job.description}</p>
                  </Job>
                </Link>
              )
            })}
          </JobsListContainer>
          <ActivityLog>
            <p>Activity Log</p>
          </ActivityLog>
        </JobsContainer>
      </PageContainer>
    </Layout>
  )
}
