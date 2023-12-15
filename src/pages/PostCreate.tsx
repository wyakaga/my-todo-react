import React, {useState} from 'react'
const PostCreate = () => {
  const [form, setForm] = useState({
    body: '',
    title: '',
    userId: 0
  })
  const handleSubmit = () => {
    console.log(form);
  }
  return (
    <div>
      <h1>Post Create</h1>
      <form action="" method='post' onSubmit={handleSubmit}>
          <div>
            <input 
              type="number" 
              onChange={
                (e: React.FormEvent<HTMLInputElement>) => 
                  setForm({...form, userId: Number(e.currentTarget.value)})
                } 
              placeholder='userId' />
          </div>
          <div>
            <input 
              type="text" 
              onChange={
                (e: React.FormEvent<HTMLInputElement>) => 
                  setForm({...form, title: e.currentTarget.value})
                } 
              placeholder='title' />
          </div>
          <div>
            <input 
              type="text" 
              onChange={
                (e: React.FormEvent<HTMLInputElement>) => 
                  setForm({...form, body: e.currentTarget.value})
                } 
              placeholder='body' />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
    </div>
  )
}

export default PostCreate