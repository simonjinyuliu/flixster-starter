import SortDropDown from "./Sort"
export default function Header({onSortChange}){ 
  return(
    <>
      <header>
        <h1>{"Netflizzy🍿"}</h1>
        <SortDropDown onSortDropDownChange={onSortChange}/>
      </header>
    </>
  )
}