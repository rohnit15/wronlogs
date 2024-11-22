import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createPost, getPosts } from '../proxies';

interface Post {
  body: string;
  createdDate: string;
  _id: string;
  title: string;
}

function App() {
  const [count, setCount] = useState(0)
  const [posts, setPosts] = useState<Post[]>([]);

  const handleCreatePost = async () => {
    try {
      const postData = { title: 'New Post', content: 'This is a new post.' };
      const response = await createPost(postData);
      console.log('Post created:', response);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleGetPosts = async () => {
    try {
      const posts = await getPosts();
      setPosts(posts);
      console.log('Fetched posts:', posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  const storeToken = (token: string) => {
    localStorage.setItem('userToken', token);
  };

  const handleLogin = async () => {
    // Assume login logic here and you get a token
    const token = 'your-jwt-token';
    storeToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={handleCreatePost}>Create Post</button>
        <button onClick={handleGetPosts}>Get Posts</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogout}>Logout</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div>
        <h2>Posts</h2>
        <ul>
          {posts.map(post => (
            <li key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <small>Created on: {new Date(post.createdDate).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
