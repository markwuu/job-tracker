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

const JobContainer= styled.div`
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

const Job = () => {
  const router = useRouter()
  const { id } = router.query
  const [session, loading] = useSession();
  const emptyJobObject = {company: '', description: '', status: ''};
  const [job, setJob] = useState(emptyJobObject);
  const [jobId, setJobId] = useState(null);
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [offer, setOffer] = useState('');
  const [website, setWebsite] = useState('');
  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/job/${id}`);
      const json = await res.json();

      if(json.data[0]) {
        setJob(json.data[0])
        setJobId(json.data[0]._id);
      }
    }

    fetchData();
  }, [session, id, setJob]);

  if( typeof window !== "undefined" && loading) return null;

  if(!session) {
    return (
      <>
        <h1>You arent signed in, please sign in first</h1>
      </>
    )
  }

  const onFormCompanyChange = (event) => {
    setCompany(event.target.value);
  }

  const onFormDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const onFormStatusChange = (event) => {
    setStatus(event.target.value)
  }

  const onFormOfferChange = (event) => {
    setOffer(event.target.value)
  }

  const onFormWebsiteChange = (event) => {
    setWebsite(event.target.value)
  }

  const updateJob = async () => {
    const res = await fetch(`/api/job/${id}`, {
      method: 'POST',
      body: JSON.stringify({
        id: jobId,
        company: company,
        description: description,
        status: status,
        offer: offer,
        website: website
      })
    });

    const json = await res.json();
    router.reload();
  }

  const displayEditForm = () => {
    setEditStatus(true);
  }

  const displayJobCard = () => {
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
                  <h1>Company: {job && job.company ? job.company : ''}</h1>
                  <button onClick={displayEditForm}>Edit</button>
                </InnerTitleContainer>
              </OuterTitleContainer>
              <JobContainer>
                <p><span>Description:</span> {job && job.description ? job.description : ''}</p>
                <p><span>Status:</span> {job && job.status ? job.status : ''}</p>
                <p><span>Offer:</span> {job && job.offer ? job.offer : ''}</p>
                <p><span>Website:</span> {job && job.website ? <Link href={job.website}><a>{job.website}</a></Link> : ''}</p>
              </JobContainer>
            </Container>
          ) : (
            <Form>
              <label>
                  company
              </label>
              <input type="text" name="name" value={company} onChange={onFormCompanyChange}/>
              <label>
                  description
              </label>
              <input type="text" name="description" value={description} onChange={onFormDescriptionChange}/>
              <label>
                  status
              </label>
              <input type="text" name={status} value={status} onChange={onFormStatusChange}/>
              <label>
                  offer
              </label>
              <input type="text" name={offer} value={offer} onChange={onFormOfferChange}/>
              <label>
                  website
              </label>
              <input type="text" name={website} value={website} onChange={onFormWebsiteChange}/>
              <input type="submit" value="Submit" onClick={updateJob} />
              <button onClick={displayJobCard}>Cancel</button>
            </Form>
          )
        }
      </PageContainer>
    </Layout>
  )
}

export default Job
