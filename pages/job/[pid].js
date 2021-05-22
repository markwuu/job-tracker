import { useRouter } from 'next/router'

const Job = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Job: {pid}</p>
}

export default Job
