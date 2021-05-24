import { useRouter } from 'next/router'

const Algorithm = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Algorithm: {id}</p>
}

export default Algorithm
