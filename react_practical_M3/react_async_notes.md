# React Async / Await + Data Fetching (DETAILED NOTES)

## 1) What is Async & Await?

- `async` keyword is used to declare a function which returns a Promise.
- `await` pauses code execution until the Promise resolves.
- Makes asynchronous code readable like normal code.
- Used a lot for network/API calls.
- Don’t use await at top-level in React components (except inside async functions).

Example:

```js
async function demo() {
  const result = await fetch("https://example.com");
  console.log("data received");
}
```

---

## 2) Fetching Data in React using fetch()

- `fetch()` is used to call APIs in browser.
- `fetch` returns a Promise.
- `fetch` only rejects if network fails.
- To get API body → use `res.json()`.

basic example:

```js
const res = await fetch("https://jsonplaceholder.typicode.com/posts");
const data = await res.json();
```

---

## 3) Show Loading & Handle Error Properly

We must show 3 states:

| State | UI |
|-------|---|
| loading | show spinner / text |
| success | show data |
| error | show error message |

Recommended best code pattern:

```js
async function loadData() {
  setLoading(true);

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error("API Error: " + res.status);
    }

    const data = await res.json();
    setPosts(data);
  }
  catch(error) {
    alert("Error: " + error.message);
  }
  finally {
    setLoading(false);
  }
}
```

why `finally`? → it runs always at the end whether success or error. Good place to set loading false.

---

## 4) useEffect async pattern (VERY IMPORTANT)

WRONG ❌

```js
useEffect(async () => {
  // fetch
}, []);
```

CORRECT ✅

```js
useEffect(() => {
  async function run() {
    await loadData();
  }
  run();
}, []);
```

Why?

- useEffect callback cannot be async because React expects synchronous cleanup return.
- we create **inner async function** and call it.

---

## 5) Full example code

```jsx
import { useEffect, useState } from "react";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);

    try {
      await new Promise(r => setTimeout(r, 2000)); // slow down to see loading
      const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

      if (!res.ok) throw new Error("API Error");

      const data = await res.json();
      setPosts(data);
    }
    catch(err) {
      alert("Error occurred: " + err.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Posts</h1>
      {loading && <p>Loading...</p>}
      {!loading && posts.map(p => <p key={p.id}>{p.title}</p>)}
    </div>
  );
}
```

---

## SUMMARY NOTES (SHORT)

| Topic | Key Point |
|------|-----------|
| async/await | await stops until promise resolves |
| fetch() | returns Promise, fetch fails only on network fail |
| error handling | use try/catch & check res.ok |
| loading state | show a state before & after fetch |
| useEffect async | use inner async function, not async directly in useEffect |

---


