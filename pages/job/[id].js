import { useRouter } from 'next/router'
import Layout from '../../components/layout';

const Job = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout page={'jobs'}>
      <h1>Job: {id}</h1>
    </Layout>
  )
}

export default Job
