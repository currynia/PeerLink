import { useEffect, useState } from "react";
import { ApiAccess, UserProfile } from "../../../api/ApiAccess";
import UserDetails from "../../../UserDetails";
import { Box, Button, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";


const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState<UserProfile|null>(null);
    const username = UserDetails.getUsername();
    const [modules, setModules] = useState<Module[]>([]);
    const [moduleCodes, setModuleCodes] = useState<string[]>([]);
    const [selectedModule, setSelectedModule] = useState<string>('');
    const [userModules, setUserModules] = useState<string[]>([]);
    const [fac, setFac] = useState<string>('');
    const faculties = ["SOC","CHS", "Pharmacy", "FASS", "Med", "Dentistry", 
      "Biz", "Music", "CDE", "Law", "Nursing"];
    const [editFacultyMode, setEditFacultyMode] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
          const response = await ApiAccess.getProfile({username:UserDetails.getUsername()});
          const modresponse = await fetch('https://api.nusmods.com/v2/2018-2019/moduleList.json', {
            headers: {
                'Accept': 'application/json',
            },
        }).then((response) => response.json())

        setModules(modresponse)
        setUserProfile(response);
        if (response.modules){
          setUserModules(response.modules);
        }
        })();
      },[]);

    useEffect(() => {
        if (modules.length > 0) {
            const codes = modules.map(module => module.moduleCode);
            setModuleCodes(codes);
        }
    }, [modules]);

    const handleAddModule = () => {
      if (userProfile && selectedModule && !userModules.includes(selectedModule)) {
        const newModList = userModules.concat(selectedModule)
        const updatedProfile = {...userProfile, modules:newModList}
        setUserModules(newModList)
        setUserProfile(updatedProfile)
        ApiAccess.updateProfile(updatedProfile)
      }
    };

    const handleRemoveModule = (moduleCode: string) => {
      if (userProfile) {
        const newModList = userProfile.modules.filter(module => module!=moduleCode)
        const updatedProfile = {...userProfile, modules: newModList}
        setUserProfile(updatedProfile)
        setUserModules(newModList)
        ApiAccess.updateProfile(updatedProfile)
      }
    };

    const handleFacultyChange = (event) => {
      if (userProfile) {
        const newFac = event.target.value;
        setFac(newFac);
        const updatedProfile = { ...userProfile, major: newFac };
        setUserProfile(updatedProfile);
        ApiAccess.updateProfile(updatedProfile);
        setEditFacultyMode(false); // Hide the select box after change
      }
    };


    return (
      <Container>
        <Typography variant="h4" component="h2" gutterBottom>
          MY PROFILE
        </Typography>
        <Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography>
              <strong>Username:</strong> {userProfile?.username || 'N/A'}
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography>
              <strong>Email:</strong> {userProfile?.email || 'N/A'}
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography>
              <strong>Age:</strong> {userProfile?.age || 'N/A'}
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography>
              <strong>Faculty:</strong>
              {editFacultyMode ? (
                <select value={fac} onChange={handleFacultyChange} style={{ marginLeft: 10 }}>
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty}>
                      {faculty}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  {userProfile?.major || 'N/A'}
                  <IconButton onClick={() => setEditFacultyMode(true)}>
                    <EditIcon />
                  </IconButton>
                </>
              )}
            </Typography>
          </Box>
          <Box component="li" sx={{ mb: 2 }}>
            <Typography>
              <strong>Gender:</strong> {userProfile?.gender || 'N/A'}
            </Typography>
          </Box>
        </Box>
        <Box mt={4}>
          <Typography variant="h5" component="h3">
            Select a Module
          </Typography>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          >
            <option value="" disabled>
              -- Select a Module --
            </option>
            {moduleCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
          <Button variant="contained" onClick={handleAddModule}>
            Add Module
          </Button>
        </Box>
        <Box mt={4}>
          <Typography variant="h5" component="h3">
            Modules
          </Typography>
          {userModules.length > 0 ? (
            <ul>
              {userModules.map((module, index) => (
                <li key={index}>
                  {module}
                  <Button onClick={() => handleRemoveModule(module)} sx={{ ml: 2 }}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No modules found.</Typography>
          )}
        </Box>
      </Container>
    );
  };
  

    interface Module {
        moduleCode: string;
        title: string;
        semesters: number[];
    }


export default ProfilePage;

