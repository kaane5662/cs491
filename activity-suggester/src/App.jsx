import { useState } from "react";
import "./App.css";

const ACTIVITY_TYPES = [
  "education",
  "recreational",
  "social",
  "diy",
  "charity",
  "cooking",
  "relaxation",
  "music",
  "busywork",
];

const TYPE_ICONS = {
  education: "📚",
  recreational: "🎮",
  social: "👥",
  diy: "🔨",
  charity: "❤️",
  cooking: "🍳",
  relaxation: "🧘",
  music: "🎵",
  busywork: "📋",
};

const DURATION_ICONS = {
  minutes: "⚡",
  hours: "🕐",
  days: "📅",
  weeks: "🗓️",
};

function ActivityCard({ activity }) {
  return (
    <div className="activity-card">
      <div className="activity-type-badge">
        <span>{TYPE_ICONS[activity.type] || "✨"}</span>
        <span>{activity.type}</span>
      </div>

      <h2 className="activity-title">{activity.activity}</h2>

      <div className="activity-meta">
        <div className="meta-item">
          <span className="meta-icon">👤</span>
          <span>
            {activity.participants}{" "}
            {activity.participants === 1 ? "person" : "people"}
          </span>
        </div>

        <div className="meta-item">
          <span className="meta-icon">
            {DURATION_ICONS[activity.duration] || "⏱️"}
          </span>
          <span>{activity.duration}</span>
        </div>

        <div className="meta-item">
          <span className="meta-icon">💰</span>
          <span>{activity.price === 0 ? "Free" : `~$${activity.price * 100}/100`}</span>
        </div>

        <div className="meta-item">
          <span className="meta-icon">♿</span>
          <span>{activity.accessibility}</span>
        </div>

        <div className="meta-item">
          <span className="meta-icon">🧒</span>
          <span>{activity.kidFriendly ? "Kid friendly" : "Adults only"}</span>
        </div>
      </div>

      {activity.link && (
        <a
          href={activity.link}
          target="_blank"
          rel="noopener noreferrer"
          className="activity-link"
        >
          Learn more →
        </a>
      )}
    </div>
  );
}

export default function App() {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter state
  const [selectedType, setSelectedType] = useState("");
  const [participants, setParticipants] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const buildFilterUrl = () => {
    const params = new URLSearchParams();
    if (selectedType) params.append("type", selectedType);
    if (participants) params.append("participants", participants);
    if (maxPrice !== "") params.append("maxprice", maxPrice);

    const hasFilters = [...params].length > 0;
    return hasFilters
      ? `https://bored-api.appbrewery.com/filter?${params}`
      : `https://bored-api.appbrewery.com/random`;
  };

  const fetchActivity = async () => {
    setLoading(true);
    setError(null);
    setActivity(null);

    try {
      const url = buildFilterUrl();
      const res = await fetch(url);

      if (!res.ok) {
        console.log(await res.json())
        if (res.status === 404) {
          throw new Error(
            "No activities found for your filters. Try adjusting them!"
          );
        }

        throw new Error(`API error: ${res.status}`);
      }

      const data = await res.json();

      // /filter returns an array, /random returns a single object
      if (Array.isArray(data)) {
        const random = data[Math.floor(Math.random() * data.length)];
        setActivity(random);
      } else {
        setActivity(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSelectedType("");
    setParticipants("");
    setMaxPrice("");
  };

  const hasFilters = selectedType || participants || maxPrice !== "";

  return (
    <div className="app">
      <header className="header">
        <div className="header-icon">🎯</div>
        <h1 className="header-title">What to Do?</h1>
        <p className="header-subtitle">
          Stuck for ideas? Let us suggest something fun.
        </p>
      </header>

      <main className="main">
        {/* Filters */}
        <section className="filters-section">
          <h3 className="filters-heading">Filter by preference</h3>
          <div className="filters-grid">
            {/* Type */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="type">
                Activity Type
              </label>
              <select
                id="type"
                className="filter-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Any type</option>
                {ACTIVITY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Participants */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="participants">
                Participants
              </label>
              <select
                id="participants"
                className="filter-select"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
              >
                <option value="">Any number</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "person" : "people"}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="filter-group">
              <label className="filter-label" htmlFor="price">
                Max Price
              </label>
              <select
                id="price"
                className="filter-select"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              >
                <option value="">Any price</option>
                <option value="0">Free only</option>
                <option value="0.1">Low cost</option>
                <option value="0.5">Mid range</option>
                <option value="1.0">Any budget</option>
              </select>
            </div>
          </div>

          {hasFilters && (
            <button className="clear-btn" onClick={clearFilters}>
              ✕ Clear filters
            </button>
          )}
        </section>

        {/* CTA Button */}
        <button
          className="suggest-btn"
          onClick={fetchActivity}
          disabled={loading}
        >
          {loading ? (
            <span className="loading-spinner">
              <span className="spinner" />
              Finding something…
            </span>
          ) : (
            <>✨ Suggest an Activity</>
          )}
        </button>

        {/* Result */}
        {error && (
          <div className="error-box" role="alert">
            <span>😕</span> {error}
          </div>
        )}

        {activity && !loading && <ActivityCard activity={activity} />}

        {!activity && !loading && !error && (
          <div className="empty-state">
            <div className="empty-icon">🎲</div>
            <p>Hit the button and we'll find something great for you.</p>
          </div>
        )}
      </main>

      <footer className="footer">
        Powered by{" "}
        <a
          href="https://bored-api.appbrewery.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bored API
        </a>{" "}
        · App Brewery
      </footer>
    </div>
  );
}
