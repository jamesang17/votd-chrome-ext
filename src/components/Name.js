import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';
import './Name.css';

const CustomDialog = withStyles({
  root: {
    '& .MuiDialog-paper': {
        width: "50vw",
        background: 'rgba(255,255,255,0.9)'
    },
    '& .Mui-focused:after': {
        borderBottomColor: "blue"
    },
  },
})(Dialog);


export default class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            value: "",
            anchorEl: null,
            open: false,
            openDialog: false
        }

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const key = "name";
        if (localStorage.hasOwnProperty(key)) {
            // get the key's value from localStorage
            let value = localStorage.getItem(key);
            // parse the localStorage string and setState
            try {
                value = JSON.parse(value);
                this.setState({ [key]: value });
            } catch (e) {
                // handle empty string
                this.setState({ [key]: value });
            }
        }
    }

    handleButtonClick(event) {
        this.setState({ anchorEl: event.currentTarget });
        this.setState({ open: true });
    }

    handleMenuClick() {
        this.setState({ openDialog: true });
    }

    handleClose() {
        this.setState({ open: false });
        this.setState({ anchorEl: true });
        this.setState({ openDialog: false });
    }

    handleSubmit(event) {
        var name = this.state.value.trim();
        if (name !== "") {
            name = ", " + name + ".";
            this.setState({ name: name });
            localStorage.setItem("name", JSON.stringify(name));
        } else {
            this.setState({ name: JSON.parse(localStorage.getItem("name")) });
        }
        this.setState({ value: "" });
        this.setState({ open: false });
        this.setState({ anchorEl: true });
        this.setState({ disabled: false });
        this.setState({ openDialog: false });
    }

    render() {
        const options = ["Edit Name"];
        return (
            <div className="Name-container">
                <p className="Name">{this.state.name}</p>
                <IconButton
                    aria-label="more"
                    aria-haspopup="true"
                    className="Menu-button"
                    onClick={this.handleButtonClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch',
                      },
                    }}
                >
                    {options.map((option) => (
                      <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleMenuClick}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                  <CustomDialog onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        open={this.state.openDialog}>
                        <DialogContent>
                            <TextField autoFocus id="name"
                                label="name" type="text"
                                fullWidth
                                onChange={(e) => this.setState({ value: e.currentTarget.value })} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="default">
                                Cancel
                            </Button>
                            <Button onClick={this.handleSubmit} color="primary" >
                                Save
                            </Button>
                        </DialogActions>
                    </CustomDialog>
            </div>
        )
    }
}
