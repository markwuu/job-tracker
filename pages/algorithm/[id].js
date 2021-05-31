import { useRouter } from 'next/router';
import Layout from '../../components/layout';

const Algorithm = () => {
  const router = useRouter()
  const { id } = router.query

  return <Layout>Algorithm: {id}</Layout>
}

export default Algorithm
