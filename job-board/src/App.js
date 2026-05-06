import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [postIDs, setPostIDs] = useState([]);
  const [postMetadata, setPostMetadata] = useState([]);

  const getData = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const getFormattedDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const getJobTitle = (text = "") => {
    const arr = text.split(/\((YC [^)]+)\)/);

    if (arr.length > 1) {
      const part1 = arr[0];
      const part2 = arr[1];
      return `${part1} ${part2}`;
    }

    return text || "N/A";
  };

  const getJobInfo = (text = "") => {
    const arr = text.split(/\((YC [^)]+)\)/);

    if (arr.length > 2) {
      return arr[2];
    }

    return "N/A";
  };

  const fetchPostMetadata = async (ids) => {
    const apiCalls = ids.map((id) => {
      const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
      return getData(url);
    });

    const results = await Promise.all(apiCalls);

    const validResults = results.filter((item) => item && item.title);

    const newArr = validResults.map((item) => {
      return {
        jobTitle: getJobTitle(item.title),
        jobInfo: getJobInfo(item.title),
        date: item.time ? getFormattedDate(item.time) : "N/A",
        url: item.url
          ? item.url
          : `https://news.ycombinator.com/item?id=${item.id}`,
      };
    });

    setPostMetadata((prev) => [...prev, ...newArr]);
  };

  const fetchPostIDs = async () => {
    const url = "https://hacker-news.firebaseio.com/v0/jobstories.json";
    const data = await getData(url);

    if (!data) return;

    const ids = data.slice(0, 9);
    const remainingIds = data.slice(9);

    setPostIDs(remainingIds);
    fetchPostMetadata(ids);
  };

  useEffect(() => {
    fetchPostIDs();
  }, []);

  const handleLoadMore = () => {
    const ids = postIDs.slice(0, 6);
    const remainingIds = postIDs.slice(6);

    fetchPostMetadata(ids);
    setPostIDs(remainingIds);
  };

  return (
    <div className="App">
      <h1>Job Board</h1>

      <div className="cards">
        {postMetadata.length === 0 ? (
          <div>Loading...</div>
        ) : (
          postMetadata.map((post, index) => (
            <a
              key={index}
              className="card"
              href={post.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="company-info">{post.jobTitle}</div>

              <div className="hiring-info">{post.jobInfo}</div>

              <div className="date">{post.date}</div>
            </a>
          ))
        )}
      </div>

      {postIDs.length > 0 && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
}

export default App;
