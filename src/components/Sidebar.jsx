import { useState } from "react"
export default function SideBar({onShowFavorites, goHome, onShowWatched}){
  return(
    <>
      <div id="side-bar">
        <div className="nav-btns">
          <button onClick={goHome}>Now Playing</button>
          <button onClick={onShowFavorites}>Favorite Movies</button>
          <button onClick={onShowWatched}>Watched Movies</button>
        </div>
      </div>
    </>
  )
}