import { useRouter } from 'next/router'

const Job = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Job: {id}</p>
}

export default Job
