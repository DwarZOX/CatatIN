import NoteContent from "./NoteContent";

function Card({notes,onDelete,onToggleArchive,isArchived}) {
    return (
        <div className="card">
            {notes.map(data => (
                <NoteContent key={data.id}{...data} id={data.id} onDelete={onDelete} onToggleArchive={onToggleArchive} isArchived={isArchived}/>
            ))}
        </div>
    )
}

export default Card