import { FC } from 'react'
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Login: FC = () => {
    return (
        <div>
            ログイン
            <Button variant="outlined" size="large" component={Link} to="/">
                HOME
            </Button>
        </div>
    );
}

export default Login;
