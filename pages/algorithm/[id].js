import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useSession } from "next-auth/client";
import Layout from '../../components/layout';
import styled from 'styled-components';
import Link from 'next/link';

const PageContainer= styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container= styled.div`
  min-height: 500px;
  min-width: 250px;
  background-color: white;
  border-radius: 3px;
  padding: 20px 40px 40px 40px;
`;

const OuterTitleContainer = styled.div`
  display: flex;
  height: 80px;
  margin: 0;
  width: 750px;

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

const InnerTitleContainer = styled.div`
  margin: auto 0;
  font-size: 40px;
  font-weight: 400;
  width: 750px;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;

  h1 {
    font-size: 25px;
    text-transform: uppercase;
  }

  button {
    background: #ff9b7d;
    color: white;
    padding: 10px;
    min-width: 100px;
    text-align: center;
    border-radius: 3.5px;
    font-size: 11px;
    letter-spacing: 0.2px;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    height: 30px;
  }
`;

const AlgorithmContainer= styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 750px;
  padding-top: 30px;

  p {
    width: 500px;
  }

  span {
    text-transform: uppercase;
    font-weight: 700;
  }

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  min-width: 250px;
  background-color: white;
  border-radius: 5px;
  padding: 15px 35px 35px 35px;
  box-shadow: 0 3px 0px 0px;
  color: #cad1dc;

  label {
    border: 0px solid black;
    padding: 10px 0 2px 0;
    color: black;
    font-size: 18px;
    text-transform: uppercase;
  }

  input {
    border: 1px solid #898d94;
    margin-bottom: 10px;
    border-radius: 3px;
    height: 20px;
  }

  input[type=submit] {
    margin-top: 15px;
    background: #9d99cb;
    color: white;
    padding: 10px;
    min-width: 100px;
    text-align: center;
    border-radius: 3.5px;
    font-size: 11px;
    letter-spacing: 0.2px;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    height: 30px;

    &:hover {
      background: #817da6;
    }
  }

  button {
    background: #de6161;
    color: white;
    padding: 10px;
    min-width: 100px;
    text-align: center;
    border-radius: 3.5px;
    font-size: 11px;
    letter-spacing: 0.2px;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    height: 30px;

    &:hover {
      background: #ae4f4f;
    }
  }
`;

const Algorithm = () => {
  const router = useRouter()
  const { id } = router.query
  const [session, loading] = useSession();
  const emptyAlgorithmObject = {company: '', description: '', status: ''};
  const [algorithm, setAlgorithm] = useState(emptyAlgorithmObject);
  const [algorithmId, setAlgorithmId] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/algorithm/${id}`);
      const json = await res.json();

      if(json.data[0]) {
        setAlgorithm(json.data[0])
        setAlgorithmId(json.data[0]._id);
      }
    }

    fetchData();
  }, [session, id, setAlgorithm]);

  if( typeof window !== "undefined" && loading) return null;

  if(!session) {
    return (
      <>
        <h1>You arent signed in, please sign in first</h1>
      </>
    )
  }

  const onFormNameChange = (event) => {
    setName(event.target.value);
  }

  const onFormDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const onFormLinkChange = (event) => {
    setLink(event.target.value)
  }

  const updateAlgorithm = async () => {
    const res = await fetch(`/api/algorithm/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        id: algorithmId,
        name: name,
        description: description,
        link: link
      })
    });

    const json = await res.json();
    router.reload();
  }

  const displayEditForm = () => {
    setEditStatus(true);
  }

  const displayAlgorithmCard = () => {
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
                  <h1>Algorithm: {algorithm && algorithm.name ? algorithm.name : ''}</h1>
                  <button onClick={displayEditForm}>Edit</button>
                </InnerTitleContainer>
              </OuterTitleContainer>
              <AlgorithmContainer>
                <p><span>Description:</span> {algorithm && algorithm.description ? algorithm.description : ''}</p>
                <p><span>Link:</span> {algorithm && algorithm.link ? <Link href={algorithm.link}><a>{algorithm.link}</a></Link> : ''}</p>
              </AlgorithmContainer>
            </Container>
          ) : (
            <Form>
              <label>
                  Name
              </label>
              <input type="text" name="name" value={name} onChange={onFormNameChange}/>
              <label>
                  description
              </label>
              <input type="text" name="description" value={description} onChange={onFormDescriptionChange}/>
              <label>
                  link
              </label>
              <input type="text" name={link} value={link} onChange={onFormLinkChange}/>
              <input type="submit" value="Submit" onClick={updateAlgorithm} />
              <button onClick={displayAlgorithmCard}>Cancel</button>
            </Form>
          )
        }
      </PageContainer>
    </Layout>
  )
}

export default Algorithm
