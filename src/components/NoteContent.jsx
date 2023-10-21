import ActionButton from "./ActionButton";

function NoteContent({title,createdAt,body,id,onDelete,onToggleArchive,isArchived}) {
    return (
        <div className="content">
            <h1>{title}</h1>
            <p>Time: {createdAt}</p>
            <p>{body}</p>
            <ActionButton id={id} onClick={onDelete} title={'Delete'}/>
            <ActionButton id={id} onClick={onToggleArchive} title={isArchived ? 'Unarchive' : 'Archive'}/>
        </div>
    )
}

export default NoteContent