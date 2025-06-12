export default function SortDropDown({onSortDropDownChange}){
  function sortDropDownChange(event){
    const val = event.target.value;
    return onSortDropDownChange(val)
  }
  return(
  <select onChange={sortDropDownChange}>
    <option value="" >Sort by...</option>
    <option value="title">{"Sort by Title(A-Z)"}</option>
    <option value="release_dates">{"Sort by Release Date(Latest)"}</option>
    <option value="vote_average" >{"Sort by ⭐️ ratings"}</option>
  </select>
  )
}

