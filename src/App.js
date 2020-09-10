import React, { useState, useEffect } from "react";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch(
      "https://api.github.com/users/jeanmauricio96/repos"
    );
    const data = await response.json();
    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);
    document.title = `You are ${filtered.length} favorites.`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositoreis = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositoreis);
  }

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  );
}
