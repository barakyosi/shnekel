import React, { Component } from 'react';
import './App.css';
import firebase from '../../helpers/firebase';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] }; // <- set up react state
    }

    componentDidMount(){
        const onMessageChange = (id, message) => {
            this.setState({ messages: [{id, ...message}].concat(this.state.messages) });
        };
        firebase.firestore()
            .collection('messages')
            .limit(50).onSnapshot(function (snapshot) {
                if (!snapshot.size) {
                    return;
                }
                snapshot.docChanges().forEach(function(change) {
                    if (change.type === 'added') {
                        onMessageChange(change.doc.id, change.doc.data());
                    }
                });
        });
    }

    addMessage(e){
        e.preventDefault(); // <- prevent form submit from reloading the page
        firebase.firestore().collection('messages').add({text: this.inputEl.value});
        this.inputEl.value = ''; // <- clear the input
    }

    render() {
        return (
            <div className="App">
                <header className="App__header">
                    <p>
                        Hello Shnekel!
                    </p>
                </header>
                <form onSubmit={this.addMessage.bind(this)}>
                    <input type="text" ref={ el => this.inputEl = el }/>
                    <input type="submit"/>
                    <ul>
                        { this.state.messages.map( message => <li key={message.id}>{message.text}</li> )}
                    </ul>
                </form>
            </div>
        );
    }
}

export default App;
