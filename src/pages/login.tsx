import { Component } from 'react'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default class Login extends Component {
    render() {
        return (
            <div>
                ログイン
                <Button variant="outlined" size="large" component={Link} to="/">
                    HOME
                </Button>
            </div>
        );
    }
}