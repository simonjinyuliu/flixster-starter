import Sort from "./Sort"
export default function Header({sorted}){
  return(
    <>
      <header>
        <h1>Netflizzy</h1>
        <Sort onSortChange={sorted}/>
      </header>
    </>
  )
}