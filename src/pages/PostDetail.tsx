import {useParams} from 'react-router-dom'

const PostDetail = () => {
  const params = useParams<{id: string}>()
  const id = params.id as string
  return (
    <div>
      <h1>Post Detail {id}</h1>
    </div>
  )
}

export default PostDetail