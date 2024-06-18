import { useEffect, useState } from "react";
import { ApiAccess, UserProfile } from "../../../api/ApiAccess";
import UserDetails from "../../../UserDetails";
import { Button, IconButton } from "@mui/material";
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
        //setUserModules([...userModules, selectedModule]);
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

    const handleFacultyChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
      if (userProfile) {
        const newFac = e.target.value;
        setFac(newFac);
        const updatedProfile:UserProfile = {...userProfile, major:newFac};
        setUserProfile(updatedProfile);
        ApiAccess.updateProfile(updatedProfile);
      }
    }



      return (
        <div>
          <h1>MY PROFILE</h1>
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Email:</strong> {userProfile?.email || 'N/A'}
          </p>
          <p>
            <strong>Age:</strong> {userProfile?.age || 'N/A'}
          </p>
          <p>
                <strong>Faculty:</strong> {userProfile?.major || 'N/A'}
                {editFacultyMode ? (
                    <select value={fac} onChange={handleFacultyChange}>
                        <option value="">--Select a faculty--</option>
                        {faculties.map((faculty) => (
                            <option key={faculty} value={faculty}>
                                {faculty}
                            </option>
                        ))}
                    </select>
                ) : (
                    <>
                        {fac}
                        <IconButton onClick={() => setEditFacultyMode(true)}>
                            <EditIcon />
                        </IconButton>
                    </>
                )}
            </p>
          <p>
            <strong>Gender:</strong> {userProfile?.gender || 'N/A'}
          </p>
          <div>
             <h2>Select a Module</h2>
             <select value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
                 <option value="">--Select a module--</option>
                 {moduleCodes.map((code) => (
                 <option key={code} value={code}>
                {code}
                </option>
             ))}
            </select>
            <Button onClick={handleAddModule}>Add Module</Button>
          </div>
          <div>
                <h2>Modules</h2>
                {userModules.length > 0 ? (
                  <ul>
                    {userModules.map((module, index) => (
                    <li key={index}>
                     {module}
                     <Button onClick={() => handleRemoveModule(module)}>Remove</Button>
                    </li>
                    ))}
                  </ul>
                ) : (
                    <p>No modules found.</p>
                )}
          </div>
          {/* <button onClick = {handleSave}>SAVE</button> */}
        </div>
      );
    };

    interface Module {
        moduleCode: string;
        title: string;
        semesters: number[];
    }


export default ProfilePage;

