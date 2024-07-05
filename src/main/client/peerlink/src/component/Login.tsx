import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiAccess, LoginDto } from "../api/ApiAccess";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const loginData: LoginDto = { username, password };

  useEffect(() => {
    ApiAccess.authenticate(setAuth);
  }, []);

  if (!auth) {
    const handleLogin = async () => {
      const response = await ApiAccess.authenticateLogin(loginData);
      try {
        if (response.code === 201) {
          localStorage.setItem("token", response.token.token);
          ApiAccess.setAuthenticated(true);
          sessionStorage.setItem("user", JSON.stringify(response.user));
          navigate("/app");
        } else {
          throw Error(response.message);
        }
      } catch (error) {
        console.log((error as Error).message);
        setErrorMessage((error as Error).message)
      }
    };

    return (
      <>
        <Container maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              ml: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Login</Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address/Username"
                name="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Login
              </Button>
              {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
              <Grid container justifyContent={"flex-end"}>
                <Grid item>
                  <Link to="/register">Don't have an account? Register</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </>
    );
  } else {
    navigate("/app");
  }
};

export default Login;
