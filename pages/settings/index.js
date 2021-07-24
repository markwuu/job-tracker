import { useState, useEffect } from 'react';
import { useSession } from "next-auth/client";
import Layout from '../../components/layout';
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

  @media (max-width: 1200px) {
    width: 600px;
  }
`;

const InnerTitleContainer = styled.div`
  margin: auto 0;
  font-size: 40px;
  font-weight: 400;
  width: 400px;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;

  h1 {
    font-size: 34px;
  }
`;

const FormContainer= styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  color: #cad1dc;
  width: 400px;

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
    height: 30px;
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

export default function Settings() {
  const [session, loading] = useSession();
  const [formNameValue, setFormNameValue] = useState('');
  const [formAvatarValue, setFormAvatarValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/setting");
      const json = await res.json();

      if(json.data) {
        console.log(json.data);
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

  const onFormNameChange = (event) => {
    setFormNameValue(event.target.value);
  }

  const onFormAvatarChange = (event) => {
    setFormAvatarValue(event.target.value);
  }

  const updateSettings = async () => {
    const res = await fetch("/api/setting", {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formNameValue,
        image: formAvatarValue
      })
    });

    router.reload();
  }

  return (
    <Layout page={'settings'}>
      <PageContainer>
        <OuterTitleContainer>
          <InnerTitleContainer>
            <h1>Settings</h1>
            <CreateButton onClick={updateSettings}>Update</CreateButton>
          </InnerTitleContainer>
        </OuterTitleContainer>
        <FormContainer>
          <Form>
            <label>
                Name
            </label>
            <input type="text" name="name" value={formNameValue} onChange={onFormNameChange}/>
            <label>
                Avatar
            </label>
            <input type="text" name="avatar" value={formAvatarValue} onChange={onFormAvatarChange}/>
          </Form>
        </FormContainer>
      </PageContainer>
    </Layout>
  )
}
