import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // this will run only one time on component mount
  useEffect(() => {
    loadPosts();   // calling our async function
  }, []);

  {/*} async function loadPosts() {
    setLoading(true);
    
    //artificial slow down (2 seconds)
    await new Promise(r => setTimeout(r, 2000));

    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await res.json();

    setPosts(data);
    setLoading(false);
  }
*/}

async function loadPosts() {
  setLoading(true);

  try {

    // artificial slow down (2 seconds)
    await new Promise(r => setTimeout(r, 2000));

    const res = await fetch("https://jsonplaceholder.typicode.com/posts_WRONG?_limit=5");
    // ↑ NOTE: I purposely made WRONG url so we can simulate error

    if (!res.ok) {
      throw new Error("Server not responding");
    }

    const data = await res.json();
    setPosts(data);

  } catch (err) {
    alert("Error occurred: " + err.message);

  } finally {
    setLoading(false);
  }
}

  return (
    <div style={{ padding: 40 }}>
      <h1>Posts list</h1>

      {loading && <p>Loading...</p>}

      {!loading && posts.map(p => (
        <p key={p.id}><b>{p.title}</b></p>
      ))}
    </div>
  );
}
