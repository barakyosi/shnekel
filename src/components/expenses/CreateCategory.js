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
            .then((category) => {
                this.props.onCreate(category);
            })
            .catch((error) => {
                console.error("Error adding category: ", error);
            });
    };

    updateCategory = (values) => {
        return firebase.firestore().collection('categories').doc(this.props.editingCategory.id).update(values)
            .then(this.closeModal)
            .catch((error) => {
                console.error("Error updating category: ", error);
            });
    };

    onSubmit = (values) => {
        return this.props.editingCategory ? this.updateCategory(values) : this.addCategory(values);
    };

    closeModal = () => {
        this.props.onClose();
    };

    render() {
        const isEdit = this.props.editingCategory;
        return (
            <Dialog open={this.props.open}>
                <Form
                    onSubmit={this.onSubmit}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = "Required";
                        }
                        return errors;
                    }}
                    initialValues={{ name: isEdit ? this.props.editingCategory.name : undefined }}
                    render={({ handleSubmit, form, submitting }) => {
                        return (
                            <>
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
                                        {isEdit ? 'Update' : 'Add'}
                                    </Button>
                                </DialogActions>
                            </>
                        );
                    }}
                />
            </Dialog>
        );
    }
}

CreateCategory.propTypes = {
    open: PropTypes.bool.isRequired,
    editingCategory: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
    }),
    onClose: PropTypes.func,
    onCreate: PropTypes.func
};

export default CreateCategory;
