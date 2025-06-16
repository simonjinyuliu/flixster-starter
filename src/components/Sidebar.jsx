import { useState } from "react"
export default function SideBar({ onShowFavorites, onGoHome, onShowWatched }) {
  return (
    <aside className="sidebar">
      <nav className="nav-btns">
        <button onClick={onGoHome}>Now Playing</button>
        <button onClick={onShowFavorites}>Favorite Movies</button>
        <button onClick={onShowWatched}>Watched Movies</button>
      </nav>
    </aside>
  );
}