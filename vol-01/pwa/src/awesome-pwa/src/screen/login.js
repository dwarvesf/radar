import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";
import MyIcon from "@material-ui/icons/LocalGasStation";

import { login } from "../services/firebase";

export default function Login() {
  const classes = useStyles();

  const handleLogin = () => {
    login();
  };

  return (
    <Container className={classes.root} maxWidth="xs">
      <Button
        onClick={handleLogin}
        variant="contained"
        color="primary"
        startIcon={<MyIcon />}
      >
        Login With Google
      </Button>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));
