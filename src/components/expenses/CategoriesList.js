import React, { Component } from 'react';
import firebase from '../../helpers/firebase';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateCategory from './CreateCategory';

class CategoriesList extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [], showCreateCategory: false };
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

    handleDeleteCategory = (category) => {
        firebase.firestore()
            .collection('categories').doc(category.id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    };

    renderCategory = (category) => {
        return (
            <ListItem key={category.id}>
                <ListItemText
                    primary={category.name}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={() => this.handleDeleteCategory(category)}>
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
        this.setState({showCreateCategory: false});
    };

    render() {
        return (
            <div className="CategoriesList">
                <CreateCategory open={this.state.showCreateCategory} onClose={this.handleCloseCategoryModal} />
                <Button variant="contained" color="primary" onClick={this.showCreateCategory}>
                    Primary
                </Button>
                <List>
                    { this.state.categories.map( this.renderCategory )}
                </List>
            </div>
        );
    }
}

export default CategoriesList;
