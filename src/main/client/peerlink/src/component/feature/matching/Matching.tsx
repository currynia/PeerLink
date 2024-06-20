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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Filter Users</h2>
      <form
        noValidate
        autoComplete="off"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '8px' }}
          >
            <option value="" disabled>
              Select Gender
            </option>
            {genderOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="module">Module</label>
          <select
            id="module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '8px' }}
          >
            <option value="" disabled>
              Select Module
            </option>
            {moduleCodes.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="faculty">Faculty</label>
          <select
            id="faculty"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '8px' }}
          >
            <option value="" disabled>
              Select Faculty
            </option>
            {facultyOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleFilter}
          style={{
            padding: '10px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Filter
        </button>
      </form>
      <div style={{ marginTop: '40px' }}>
        <h3>Filtered Users</h3>
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface Module {
  moduleCode: string;
  title: string;
  semesters: number[];
}
export default FilterUsers;
