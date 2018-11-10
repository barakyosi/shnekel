import React, { Component } from 'react';
import firebase from '../../helpers/firebase';

class ExpenseList extends Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    componentDidMount(){
        firebase.firestore()
            .collection('messages')
            .limit(50).onSnapshot((snapshot) => {
            if (!snapshot.size) {
                return;
            }
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    this.setState({
                        messages: [{ id: change.doc.id, ...change.doc.data()} ].concat(this.state.messages) });
                }
                if (change.type === "modified") {
                    this.setState({messages: this.state.messages.map(m => m.id === change.doc.id ? { id: change.doc.id, ...change.doc.data()} : m)});
                }
                if (change.type === "removed") {
                    this.setState({messages: this.state.messages.filter(m => m.id !== change.doc.id)});
                }
            });
        });
    }

    render() {
        return (
            <ul>
                { this.state.messages.map( message => <li key={message.id}>Amount:{message.amount} Category:{message.category} date:{message.date.toDate().toString()} notes:{message.notes}</li> )}
            </ul>
        );
    }
}

export default ExpenseList;
