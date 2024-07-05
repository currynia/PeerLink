import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [major, setFaculty] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const registrationData = {
      username,
      email,
      password,
      age,
      gender,
      major,
    };

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    }).then((response) => response.json());

    // if (!response.ok) {
    //   throw new Error("Backend was not ok");
    // }
    try {
      if (response.code == 201) {
        //const data = await response.json();
        setSuccessMessage("Registration successful!");
        // Clear form fields after successful registration
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAge("");
        setGender("");
        setFaculty("");
        navigate("/login");
      } else {
        throw Error(response.message);
      }
    } catch (error) {
      setErrorMessage(`Registration failed: ${(error as Error).message}`);
    }
  };
  return (
    <>
      <Container maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            mt: 0,
            ml: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">Register</Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="age"
                  label="Age"
                  type="number" // Use number type for age input
                  id="age"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="faculty-label">Faculty</InputLabel>
                  <Select
                    labelId="faculty-label"
                    id="faculty"
                    value={major}
                    label="Faculty"
                    onChange={(e) => setFaculty(e.target.value)}
                  >
                    <MenuItem value="SOC">SOC</MenuItem>
                    <MenuItem value="CHS">CHS</MenuItem>
                    <MenuItem value="Pharmacy">Pharmacy</MenuItem>
                    <MenuItem value="FASS">FASS</MenuItem>
                    <MenuItem value="Med">Med</MenuItem>
                    <MenuItem value="Dentistry">Dentistry</MenuItem>
                    <MenuItem value="Biz">Biz</MenuItem>
                    <MenuItem value="Music">Music</MenuItem>
                    <MenuItem value="CDE">CDE</MenuItem>
                    <MenuItem value="Law">Law</MenuItem>
                    <MenuItem value="Nursing">Nursing</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="Gender-label">Gender</InputLabel>
                  <Select
                    labelId="Gender-label"
                    id="gender"
                    value={gender}
                    label="Gender"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="Others">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Confirm password"
                  label="Confirm Password"
                  type="Confirm password"
                  id="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Register
            </Button>

            {errorMessage && (
              <Typography color="error">{errorMessage}</Typography>
            )}
            {successMessage && (
              <Typography color="success">{successMessage}</Typography>
            )}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
