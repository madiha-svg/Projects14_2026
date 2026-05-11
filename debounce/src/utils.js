const fetchItems = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
};

const debounce = (func, delay) => {
  if (typeof func !== "function") {
    throw new Error(`not a valid function, ${func}`);
  }

  if (typeof delay !== "number") {
    throw new Error(`not a valid delay, ${delay}`);
  }
  let timeout;
  return (...args) => {
    return new Promise((resolve) => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(async () => {
        const data = await func(...args);
        resolve(data);
      }, delay);
    });
  };
};

const debounceQuery = debounce(fetchItems, 1000);

export default debounceQuery;
