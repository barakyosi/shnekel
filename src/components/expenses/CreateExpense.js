import React, { Component } from 'react';
import firebase from '../../helpers/firebase';
import { Form, Field } from 'react-final-form'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from "@material-ui/core/MenuItem";
import Button from '@material-ui/core/Button';
import DatePicker from './DatePicker';
import SelectCategoryField from './SelectCategoryField';
import TextField from './TextField';

import './CreateExpense.css';

class CreateExpense extends Component {
    constructor(props) {
        super(props);
        this.state = { open: true, showCreateCategory: false, selectedCategory: null, categories: []};
    }

    componentDidMount(){
        firebase.firestore()
            .collection('categories')
            .limit(100).onSnapshot((snapshot) => {
            if (!snapshot.size) {
                return;
            }
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    this.setState({
                        categories: [{ id: change.doc.id, ...change.doc.data()} ].concat(this.state.categories) });
                }
                if (change.type === "modified") {
                    this.setState({categories: this.state.categories.map(m => m.id === change.doc.id ? { id: change.doc.id, ...change.doc.data()} : m)});
                }
                if (change.type === "removed") {
                    this.setState({categories: this.state.categories.filter(m => m.id !== change.doc.id)});
                }
            });
        });
    }

    addMessage = (values) => {
        return firebase.firestore().collection('messages').add(values)
            .then(() => this.closeModal())
            .catch((error) => {
                console.error("Error adding message: ", error);
            });
    };

    closeModal = () => {
        this.setState({open: false});
    };

    handleCloseCategoryModal = () => {
        this.setState({showCreateCategory: false});
    };

    render() {
        return (
            <>
                <Form
                    onSubmit={this.addMessage}
                    validate={values => {
                        const errors = {};
                        if (!values.date) {
                            errors.date = "Required";
                        }
                        if (!values.category || values.category === 'CREATE') {
                            errors.category = "Required";
                        }
                        if (!values.notes) {
                            errors.notes = "Required";
                        }
                        if (!values.amount) {
                            errors.amount = "Required";
                        } else if (isNaN(values.amount)) {
                            errors.amount = "Must be a number";
                        }
                        return errors;
                    }}
                    initialValues={{ date: new Date() }}
                    render={({ handleSubmit, form, submitting }) => {
                        return (
                            <Dialog open={this.state.open}>
                                <DialogTitle>Add Expense</DialogTitle>
                                <DialogContent>
                            <form onSubmit={handleSubmit} className="CreateExpense__form">
                                <div className="CreateExpense__form-field">
                                    <Field
                                        name="date"
                                        component={DatePicker}
                                    />
                                </div>
                                <div>
                                    <Field name="category" component={SelectCategoryField} fullWidth>
                                        {this.state.categories.map(category => (<MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>))}
                                    </Field>
                                </div>
                                <div>
                                    <Field
                                        name="amount"
                                        label="amount"
                                        component={TextField}
                                        type="number"
                                    />
                                </div>
                                <div>
                                    <Field name="notes" label="notes" component={TextField}/>
                                </div>
                            </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.closeModal} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubmit} color="primary" disabled={submitting}>
                                        Add
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        );
                    }}
                />
            </>
        );
    }
}

export default CreateExpense;
