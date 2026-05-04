import { useState } from "react";

function createProfiles() {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 18 + (i % 15),
    distance: Math.floor(Math.random() * 50) + 1,
    bio: "New here 👋",
    image: null
  }));
}

export default function Home() {
  const [profiles, setProfiles] = useState(createProfiles());
  const [index, setIndex] = useState(0);

  const handleSwipe = () => {
    setIndex((prev) => prev + 1);
  };

  const handleUpload = (e, id) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setProfiles(prev =>
      prev.map(p => p.id === id ? { ...p, image: url } : p)
    );
  };

  if (index >= profiles.length) {
    return <h1 style={{ textAlign: "center" }}>No more profiles</h1>;
  }

  const profile = profiles[index];

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      {profile.image ? (
        <img src={profile.image} alt="profile" width="300" />
      ) : (
        <div style={{ height: 300, background: "#ddd" }}>Upload Photo</div>
      )}

      <input type="file" onChange={(e) => handleUpload(e, profile.id)} />

      <h2>{profile.name}, {profile.age}</h2>
      <p>{profile.distance} km away</p>
      <p>{profile.bio}</p>

      <button onClick={handleSwipe}>Next</button>
    </div>
  );
}