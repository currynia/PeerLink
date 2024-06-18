import React, { useState, useEffect } from "react";
import { ApiAccess, Filter, UserProfile } from "../../../api/ApiAccess";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

//import axios from 'axios';

const FilterUsers = () => {
  const [gender, setGender] = useState("");
  const [module, setModule] = useState("");
  const [faculty, setFaculty] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [moduleCodes, setModuleCodes] = useState<string[]>(["ANY"]);
  const [modules, setModules] = useState<Module[]>([]);
  const genderOptions = ["ANY", "Others", "male", "female"];
  const facultyOptions = [
    "ANY",
    "SOC",
    "CHS",
    "Pharmacy",
    "FASS",
    "Med",
    "Dentistry",
    "Biz",
    "Music",
    "CDE",
    "Law",
    "Nursing",
  ];

  useEffect(() => {
    (async () => {
      const modresponse = await fetch(
        "https://api.nusmods.com/v2/2018-2019/moduleList.json",
        {
          headers: {
            Accept: "application/json",
          },
        }
      ).then((response) => response.json());

      setModules(modresponse);
    })();
  }, []);

  useEffect(() => {
    const codes = modules.map((module) => module.moduleCode);
    setModuleCodes(moduleCodes.concat(codes));
  }, [modules]);

  const handleFilter = async () => {
    const response = await ApiAccess.filterProfile({
      gender: gender,
      modules: module,
      major: faculty,
    });
    setFilteredUsers(response);
  };
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Filter Users
      </Typography>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <FormControl fullWidth>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {genderOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="module-label">Module</InputLabel>
          <Select
            labelId="module-label"
            id="module"
            value={module}
            label="Module"
            onChange={(e) => setModule(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {moduleCodes.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="faculty-label">Faculty</InputLabel>
          <Select
            labelId="faculty-label"
            id="faculty"
            value={faculty}
            label="Faculty"
            onChange={(e) => setFaculty(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {facultyOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" component="h3">
          Filtered Users
        </Typography>
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </Box>
    </Container>
  );
};

//   return (
//     <div>
//       <h2>Filter Users</h2>
//       <div>
//         <label htmlFor="gender">Gender:</label>
//         <input
//           id="gender"
//           type="text"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="module">Module:</label>
//         <input
//           id="module"
//           type="text"
//           value={module}
//           onChange={(e) => setModule(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="faculty">Faculty:</label>
//         <input
//           id="faculty"
//           type="text"
//           value={faculty}
//           onChange={(e) => setFaculty(e.target.value)}
//         />
//       </div>
//       <button onClick={handleFilter}>Filter</button>
//       <ul>
//         {filteredUsers.map((user, index) => (
//           <li key={index}>
//             {user.username}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

interface Module {
  moduleCode: string;
  title: string;
  semesters: number[];
}
export default FilterUsers;
