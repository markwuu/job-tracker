import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Link from "next/link";
import Layout from '../../components/layout';
import Form from '../../components/Form';
import styled from 'styled-components';
import { useRouter } from 'next/router'

const PageContainer= styled.div`
  padding: 0 20px 20px;
  margin: auto;
  max-width: 950px;
`;

const OuterTitleContainer = styled.div`
  display: flex;
  margin: 0;

  @media (max-width: 1200px) {
    justify-content: center;
  }
`;

const InnerTitleContainer = styled.div`
  margin: 15px 0 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 30px;
  }

  @media (min-width: 1200px) {
    min-width: 600px;
    margin: 0 0 20px 0;

    h1 {
      font-size: 34px;
    }
  }

  @media (min-width: 900px) {
    min-width: 600px;
  }
`;

const JobsContainer= styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1200px) {
    justify-content: center;
  }
`;

const JobsListContainer= styled.div`
  display: flex;
  flex-direction: column;
`;

const Job = styled.div`
  border-radius: 5px;
  color: #cad1dc;
  background: #FFFFFF;
  box-shadow: 0 3px 0px 0px;
  padding: 0 100px 0 20px;
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

  @media (min-width: 900px) {
    min-width: 600px;
    padding: 0 20px 0 20px;
  }

  @media (max-width: 400px){
    padding: 0 20px 0 20px;

    p {
      font-size: 14px;
    }
  }

  @media (max-width: 900px){
    #job-description {
      display: none;
    }
  }
`;

const ActivityLog = styled.div`
  border-radius: 5px;
  background: #FFFFFF;
  border-radius: 5px;
  margin: 0 0 30px 20px;
  color: #cad1dc;
  box-shadow: 0 3px 0px 0px;
  padding: 15px;
  font-size: 20px;
  max-height: 435px;

  p {
    color: black;
    font-size: 12px;

    &:before {
    content: "???? ";
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
  text-align: center;
  border-radius: 3.5px;
  font-size: 12px;
  letter-spacing: 0.2px;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  height: 35px;
  width: 35px;
  margin: 0px 0 0 30px;

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

export default function Jobs() {
  const [session, loading] = useSession();
  const [jobs, setJobs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [formCompanyValue, setFormCompanyValue] = useState('');
  const [formDescriptionValue, setFormDescriptionValue] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/job");
      const json = await res.json();
      console.log(json.data);

      if(json.data) {
        const jobsData = json.data.jobs.map(({company, description, slugTitle}) => {
          return { company, description, slugTitle };
        });
        setJobs(jobsData);

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
    if(formDescriptionValue){
      setDisabledButton(false);
    }
    setFormCompanyValue(event.target.value);
  }

  const onFormDescriptionChange = (event) => {
    if(formCompanyValue){
      setDisabledButton(false);
    }
    setFormDescriptionValue(event.target.value);
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
          disabledButton={disabledButton}
        />
      : ''}
      <PageContainer>
        <OuterTitleContainer>
          <InnerTitleContainer>
            <h1>Jobs</h1>
            <CreateButton onClick={OpenCreateModal}>+</CreateButton>
          </InnerTitleContainer>
        </OuterTitleContainer>
        <JobsContainer>
          <JobsListContainer>
            {jobs.map((job, i) => {
              const link = `/job/${(job.slugTitle).replace(" ","-").toLowerCase()}`;
              return (
                <Link href={link} style={{color: 'black'}}>
                  <Job key={i}>
                    <p id="job-company">{job.company}</p>
                    <p id="job-description">{job.description}</p>
                  </Job>
                </Link>
              )
            })}
          </JobsListContainer>
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
        </JobsContainer>
      </PageContainer>
    </Layout>
  )
}
