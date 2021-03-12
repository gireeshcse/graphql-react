// your-app-name/src/App.js
import React from 'react';
import './App.css';
import fetchGraphQL from './fetchGraphQL';

const { useState, useEffect } = React;

function App() {
  // We'll load the name of a repository, initially setting it to null
  const [title, setTitle] = useState(null);

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query {
        dummyLinks{
          title
          address,
          user{
            name
          }
        }
      }
    `).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      const data = response.data;
      console.log(data)
      setTitle(data["dummyLinks"][0].title);
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Render "Loading" until the query completes
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {title != null ? `Link Title: ${title}` : "Loading"}
        </p>
      </header>
    </div>
  );
}

export default App;