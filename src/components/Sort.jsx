export default function Sort({onSortChange}){
  function sortChange(event){
    const value = event.target.value;
    return onSortChange(value)
  }
  return(
  <select onChange={sortChange}>
    <option value="">Sort by...</option>
    <option value="title">{"Sort by Title(A-Z)"}</option>
    <option value="release_dates">{"Sort by Release Date(Latest)"}</option>
    <option value="vote_average">{"Sort by ⭐️ ratings"}</option>
  </select>
  )
}