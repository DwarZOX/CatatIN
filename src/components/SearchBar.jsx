function SeacrhBar({value, onChange}) {
    return <input type="text"  placeholder="Search" value={value} onChange={(e)=>onChange(e)}/>
}

export default SeacrhBar