import { FC } from 'react'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login: FC = () => {

    return (
        <div>
            LOGIN
            <Button variant="outlined" size="large" component={Link} to="/login">
                MENU
            </Button>
        
        </div>
    );
}

export default Login;
