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

const AlgorithmsContainer= styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

const AlgorithmsListContainer= styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const Algorithm = styled.div`
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
      content: "✏️ ";
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

export default function Algorithms() {
  const [session, loading] = useSession();
  const [algorithms, setAlgorithms] = useState([]);
  const [logs, setLogs] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [formNameValue, setFormNameValue] = useState('');
  const [formDescriptionValue, setFormDescriptionValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/algorithm");
      const json = await res.json();
      console.log(json.data);

      if(json.data) {
        const algorithmData = json.data.algorithms.map(({name, description, slugTitle}) => {
          return { name, description, slugTitle };
        });

        setAlgorithms(algorithmData);

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

  const PostCreateAlgorithm = async () => {
    const res = await fetch("/api/algorithm", {
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
    <Layout page={'algorithms'}>
      { displayForm ?
        <Form
          CloseCreateModal={CloseCreateModal}
          PostCreate={PostCreateAlgorithm}
          formNameValue={formNameValue}
          formDescriptionValue={formDescriptionValue}
          onFormNameChange={onFormNameChange}
          onFormDescriptionChange={onFormDescriptionChange}
          name={'Algorithm Name'}
          description={'Description'}
        />
      : ''}
      <PageContainer>
        <OuterTitleContainer>
          <InnerTitleContainer>
            <h1>Algorithms</h1>
            <CreateButton onClick={OpenCreateModal}>Create</CreateButton>
          </InnerTitleContainer>
        </OuterTitleContainer>
        <AlgorithmsContainer>
          <AlgorithmsListContainer>
            {algorithms.map((algorithm, i) => {
              const link = `/algorithm/${(algorithm.slugTitle).replace(" ","-").toLowerCase()}`;
              return (
                <Link href={link} style={{color: 'black'}}>
                  <Algorithm key={i}>
                    <p>{algorithm.name}</p>
                    <p>{algorithm.description}</p>
                  </Algorithm>
                </Link>
              )
            })}
          </AlgorithmsListContainer>
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
        </AlgorithmsContainer>
      </PageContainer>
    </Layout>
  )
}
