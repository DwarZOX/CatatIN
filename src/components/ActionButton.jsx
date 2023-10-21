function ActionButton({id, onClick,title}) {
    return <button className="act-btn" onClick={() => onClick(id)}>{title}</button>
}

export default ActionButton