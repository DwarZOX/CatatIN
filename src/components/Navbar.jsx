import SeacrhBar from "./SearchBar";

function Navbar({value,onChange}) {
    return (
        <nav>
            <h1>CatatIN</h1>
            <SeacrhBar value={value} onChange={onChange}/>
        </nav>
    )
}

export default Navbar