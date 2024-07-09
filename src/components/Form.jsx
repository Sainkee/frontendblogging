import React, { useEffect, useState } from "react";

export default function Form() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const allPosts = await response.json();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, newPost]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="max-w-[90%] mx-auto flex flex-col md:flex-row  bg-white p-6 rounded-lg shadow-md mt-5">
      <form
        className="md:w-[30%] w-full mb-10 px-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            autoFocus
            placeholder="Enter title"
            onChange={handleTitleChange}
            type="text"
            value={title}
          />
        </div>
        <div>
          <label className="block text-gray-700">Content</label>
          <textarea
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter content"
            onChange={handleContentChange}
            value={content}
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>

      <div className=" w-full ">
        <h2 className=" mb-4 text-xl font-semibold text-gray-700">Posts</h2>
        <ul className=" flex flex-wrap overflow-y-scroll  gap-5 h-[80dvh] w-full  space-y-4">
          {posts.map((post, index) => (
            <li
              key={index}
              className="p-4 w-full bg-gray-100 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-600">{post.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
