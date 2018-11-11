import React, { Component } from 'react';
import firebase from '../../helpers/firebase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CreateCategory from './CreateCategory';

class CategoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [], showCreateCategory: false, editingCategory: null, deletingCategory: null };
    }

    componentDidMount(){
        firebase.firestore()
            .collection('categories')
            .limit(50).onSnapshot((snapshot) => {
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

    handleDeleteCategory = () => {
        firebase.firestore()
            .collection('categories').doc(this.state.deletingCategory.id).delete().then(() => {
            this.handleCloseDeleteModal();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    };

    handleEditCategory = (category) => {
        this.setState({
            editingCategory: category,
            showCreateCategory: true
        })
    };

    showDeleteCategoryWarning = (deletingCategory) => {
        this.setState({deletingCategory});
    };

    renderCategory = (category) => {
        return (
            <ListItem key={category.id}>
                <ListItemText
                    primary={category.name}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={() => this.handleEditCategory(category)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.showDeleteCategoryWarning(category)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    };

    showCreateCategory = () => {
        this.setState({showCreateCategory: true});
    };

    handleCloseCategoryModal = () => {
        this.setState({showCreateCategory: false, editingCategory: null});
    };

    handleCloseDeleteModal = () => {
        this.setState({deletingCategory: null});
    };

    render() {
        return (
            <div className="CategoriesList">
                <CreateCategory
                    open={this.state.showCreateCategory}
                    onClose={this.handleCloseCategoryModal}
                    onCreate={this.handleCloseCategoryModal}
                    editingCategory={this.state.editingCategory}
                />
                <Dialog
                    open={!!this.state.deletingCategory}
                    onClose={this.handleCloseDeleteModal}
                >
                    <DialogTitle>Delete Category?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {'Are you sure you want to delete category: '}
                            <b>
                                {this.state.deletingCategory ? this.state.deletingCategory.name : null}
                            </b>
                            ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDeleteModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteCategory} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="primary" onClick={this.showCreateCategory}>
                    Create Category
                </Button>
                <List>
                    { this.state.categories.map( this.renderCategory )}
                </List>
            </div>
        );
    }
}

export default CategoriesList;
