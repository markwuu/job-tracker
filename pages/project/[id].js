import { useRouter } from 'next/router'

const Project = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Project: {id}</p>
}

export default Project
