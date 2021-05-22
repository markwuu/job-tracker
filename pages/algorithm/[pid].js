import { useRouter } from 'next/router'

const Algorithm = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Algorithm: {pid}</p>
}

export default Algorithm
