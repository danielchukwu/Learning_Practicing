import { useEffect, useState } from 'react';

function App() {
  const [blog, setBlog] = useState();

  useEffect(() => {
    fetch('http://localhost:4000/')
      .then(() => res.json())
      .then(data => setBlog([...data]));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>All Blogs</h1>
        {blog && blog.maps((blog) => (
          <div key={blog.id}>{blog.title}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
