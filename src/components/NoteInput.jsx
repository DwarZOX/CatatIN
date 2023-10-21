import React from 'react'


class NoteInput extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            title: '',
            body: ''
        }
        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this)
        this.onContentChangeEventHandler = this.onContentChangeEventHandler.bind(this)
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
    }
    onTitleChangeEventHandler(e) {
        const inputText = e.target.value
        if(inputText.length <= 50) {
            this.setState({title: inputText})
        }
    }    
    onContentChangeEventHandler(e) {
        this.setState(() => {
            return {
                body: e.target.value
            }
        })
    }
    onSubmitEventHandler(e) {
        e.preventDefault()
        this.props.addNote(this.state)

        this.setState({ title: '', body: '' });
    }

    render() {
        const remainingChars = 50 - this.state.title.length
        const isCharMaxed = this.state.title.length >= 50

        let remaining;
        if (remainingChars >= 30) {
            remaining = <p>Remaining Character : {remainingChars}</p>;
        } else if (remainingChars > 0 && remainingChars < 30) {
            remaining = <p className="orange">Remaining Character : {remainingChars}</p>;
        } else if (remainingChars === 0) {
            remaining = <p className="red">Character maximum</p>;
        }
        return (
            <form className='note-input' onSubmit={this.onSubmitEventHandler}>
                {remaining}
                <input type="text" placeholder='Set the title' className={`${isCharMaxed && 'shaked'}`} required value={this.state.title} onChange={this.onTitleChangeEventHandler} maxLength={50}/>
                <textarea id="content" cols="30" rows="10" placeholder='Write something..' required value={this.state.body} onChange={this.onContentChangeEventHandler}></textarea>
                <button type='submit'>CREATE</button>
            </form>
        )
    }
}

export default NoteInput