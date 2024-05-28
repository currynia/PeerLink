import React, { useState } from "react";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("");
  const [faculty, setFaculty] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (typeof age !== "number" || age <= 0) {
      setErrorMessage("Please enter a valid age");
      return;
    }

    const registrationData = {
      username,
      email,
      password,
      age,
      gender,
      faculty,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      }).then((response) => response.json());

      if (response.code != 201) {
        throw new Error(response.message);
      }
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
    } catch (error) {
      setErrorMessage(`Registration failed: ${(error as Error).message}`);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) =>
              setAge(e.target.value === "" ? "" : parseInt(e.target.value))
            }
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Faculty:</label>
          <select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            required
          >
            <option value="" disabled>
              Select faculty
            </option>
            <option value="SOC">SOC</option>
            <option value="CHS">CHS</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="FASS">FASS</option>
            <option value="Med">Med</option>
            <option value="Dentistry">Dentisty</option>
            <option value="Biz">Biz</option>
            <option value="Music">Music</option>
            <option value="CDE">CDE</option>
            <option value="Law">Law</option>
            <option value="Nursing">Nursing</option>
          </select>
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Register;
