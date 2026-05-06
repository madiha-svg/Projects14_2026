import React, { useEffect, useState, useRef, useCallback } from "react";

function App() {
  const loaderRef = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  const fetched = async (index) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9`,
    );
    const json1 = await res.json();
    return json1;
  };

  useEffect(() => {
    const fetchFirstPage = async () => {
      const data = await fetched(1);
      setImages(data);
    };

    fetchFirstPage();
  }, []);

  const getData = useCallback(async () => {
    if (loading) return;

    setLoading(true);

    const data1 = await fetched(page);

    setImages((prev) => [...prev, ...data1]);
    setPage((prev) => prev + 1);

    setLoading(false);
  }, [page, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];

      if (target.isIntersecting) {
        getData();
      }
    });

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [getData]);

  return (
    <div>
      <h1>infinite scrolling</h1>

      {images.map((image) => (
        <img
          key={image.id}
          alt={image.title}
          src={`https://picsum.photos/150?random=${image.id}`}
        />
      ))}

      <div ref={loaderRef}>{loading && <h2>loading...</h2>}</div>
    </div>
  );
}

export default App;
