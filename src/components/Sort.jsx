import { SORT_OPTIONS } from "../config";

export default function SortDropDown({ onSort }) {
  const handleSortChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <select onChange={handleSortChange}>
      <option value="">Sort by...</option>
      <option value={SORT_OPTIONS.TITLE}>Sort by Title (A-Z)</option>
      <option value={SORT_OPTIONS.RELEASE_DATE}>Sort by Release Date (Latest)</option>
      <option value={SORT_OPTIONS.VOTE_AVERAGE}>Sort by ⭐️ ratings</option>
    </select>
  );
}
