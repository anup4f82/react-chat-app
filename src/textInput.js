import React from 'react';
import helper from './helper';


class TextInput extends React.Component {

	constructor() {
		super();
		this.state = { textInput: '', textOutput: ''}; 
		this.showMessage = this.showMessage.bind(this);
		this.updateMessage = this.updateMessage.bind(this);

	}
	render() {
		return (
			<div className="row">
				<div className="span12 chat-output">
					<h1>{this.state.textOutput}</h1>
				</div>
				<div className="span12 chat-input">
					<form onSubmit={this.showMessage}>
						<input 
							type="text"
							className="form-control"
							value={this.state.textInput}
							onChange={this.updateMessage}
							placeholder='Type a Message...'
							required />
					</form>
				</div>
			</div>
		);
	}

	showMessage(event) {
		event.preventDefault();
		console.log(this.props);
		helper.parseMessage(this.state.textInput).then((res)=>{
			this.setState( { textInput: '',textOutput: res});
		});
		

	}

	updateMessage(event) {
		this.setState({ textInput: event.target.value});

	}

}

export default TextInput;