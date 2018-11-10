import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../helpers/firebase';
import { Form, Field } from 'react-final-form'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from './TextField';

import './CreateCategory.css';

class CreateCategory extends Component {

    addCategory = (values) => {
        return firebase.firestore().collection('categories').add(values)
            .then(this.closeModal)
            .catch((error) => {
                console.error("Error adding category: ", error);
            });
    };

    closeModal = () => {
        this.props.onClose();
    };

    render() {
        return (
            <Form
                onSubmit={this.addCategory}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = "Required";
                    }
                    return errors;
                }}
                render={({ handleSubmit, form, submitting }) => {
                    return (
                        <Dialog open={this.props.open}>
                            <DialogTitle>Add Category</DialogTitle>
                            <DialogContent>
                                <form onSubmit={handleSubmit} className="CreateCategory__form">
                                    <div>
                                        <Field name="name" label="name" component={TextField}/>
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
        );
    }
}

CreateCategory.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func
};

export default CreateCategory;
