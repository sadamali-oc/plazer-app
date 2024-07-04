import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import FirebaseImageUpload from "./FirebaseImageUpload/FirebaseImageUpload";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ResponsiveDatePickers from "../../components/ResponsiveDataPickers";
import UpdateCancel from "../../components/UpdateCancel";
import { Email as EmailIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
// import { RadioGroup, Radio, FormControlLabel, FormLabel } from "@mui/material";



const FormContainer = styled("div")(({ theme }) => ({
  "& .MuiFormControl-root": {
    width: "100%",
    margin: theme.spacing(1),
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  background: "#FAFAFA",
  border: "#1976d2 1px solid",
  marginTop: 0,
  paddingTop: 5,
}));

export default function ProfileUpdateForm() {
  

  const userId = 7; // Define your ID here

  
  const [userDetails, setUserDetails] = useState({
    
    userName: "",
    userFName: "",
    userLName: "",
    Email: "",
    AddressL1: "",
    AddressL2: "",
    AddressL3: "",
    skills: "",
    DoB: "",
    gender: "",
    userPassword: "",
    role: "",
    phone: "",
    active: true,
    image: "",
    gitlink: "",
  });

  const [orgDetails, setOrgDetails] = useState([]);
  const [, setSelectedOrgId] = useState("");
  const [selectedOrgDetails, setSelectedOrgDetails] = useState({
    orgName: "",
    location: "",
    orgAddressL1: "",
    orgAddressL2: "",
    orgAddressL3: "",
    orgEmail: "",
    WebsiteLink: "",
    orgDescription: "",
    active: true,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/plazer-user/${userId}`)
      .then((res) => {
        console.log("User Details:", res.data);
        setUserDetails(res.data);
      })
      .catch((err) => console.log("Error fetching user details:", err));

    axios
      .get(`http://localhost:4000/orgAdmin/user/${userId}`)
      .then((res) => {
        console.log("Org Details:", res.data);
        setOrgDetails(res.data);
        if (res.data.length > 0) {
          setSelectedOrgId(res.data[0].id);
          setSelectedOrgDetails(res.data[0]);
        }
      })
      .catch((err) => console.log("Error fetching org details:", err));
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("org")) {
      setSelectedOrgDetails({ ...selectedOrgDetails, [name]: value });
    } else {
      setUserDetails({ ...userDetails, [name]: value });
      if (name === "Email") {
        validateEmail(value);
      }
    }
  };

  

  const handleOrgDetailsChange = (event) => {
    const newOrgNames = event.target.value
      .split("\n")
      .map((orgName) => ({ orgName }));
    setOrgDetails(newOrgNames);
  };

  const updateUser = (event) => {
    event.preventDefault();
    const formattedUserDetails = {
      ...userDetails,
      DoB: dayjs(userDetails.DoB).toISOString(), // Ensure the DoB is in ISO 8601 format
    };

    axios
      .put(
        `http://localhost:4000/plazer-user/update/${userId}`,
        formattedUserDetails
      )
      .then((response) => {
        console.log("User details updated successfully:", response.data);
      })
      .catch((err) => {
        console.log("Error updating user details:", err);
        alert(
          `Failed to update user details: ${
            err.response?.data?.message || err.message
          }`
        );
      });
  };

  const [error, setError] = useState("");
  const [email, setEmail] = useState(userDetails.Email);

  const validateEmail = (email) => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Invalid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setUserDetails({ ...userDetails, Email: value });
    validateEmail(value);
  };

  // const handleDateChange = (date) => {
  //   setUserDetails({ ...userDetails, DoB: date.toISOString() }); // Ensure the DoB is in ISO 8601 format
  // };

  const navigate = useNavigate();

  const navigateToChangePassword = () => {
    navigate(`${userDetails.userId}/password`);
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              height: "40px",
              fontSize: "12px",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <FormContainer>
        <Box sx={{ display: "flex" }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: "background.default",
              p: 1,
              marginTop: "1px",
            }}
          >
            <form onSubmit={updateUser}>
              <Item>
                <Grid container spacing={2}>
                  <Grid item xs={12} display="flex" justifyContent="center">



                    {/* profile image upload 
                     */}


                    <FirebaseImageUpload  userId={userId} value={userDetails.image} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      helperText="Please enter your first name"
                      id="userFName"
                      name="userFName"
                      label="First Name"
                      variant="outlined"
                      value={userDetails.userFName}
                      onChange={handleInputChange}
                      error={!userDetails.userFName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      helperText="Please enter your last name"
                      id="userLName"
                      name="userLName"
                      label="Last Name"
                      variant="outlined"
                      value={userDetails.userLName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      helperText="Please enter your address"
                      id="AddressL1"
                      name="AddressL1"
                      label="Address 1"
                      variant="outlined"
                      value={userDetails.AddressL1}
                      onChange={handleInputChange}
                      error={!userDetails.AddressL1}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      helperText="Please enter your address"
                      id="AddressL2"
                      name="AddressL2"
                      label="Address 2"
                      variant="outlined"
                      value={userDetails.AddressL2}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      helperText="Please enter your address"
                      id="AddressL3"
                      name="AddressL3"
                      label="Address 3"
                      variant="outlined"
                      value={userDetails.AddressL3}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ResponsiveDatePickers
                      date={dayjs(userDetails.DoB)} // Pass the Date of Birth as a dayjs object
                      setDate={(date) =>
                        setUserDetails({
                          ...userDetails,
                          DoB: date.format("YYYY-MM-DD"),
                          helperText: "Select your date of birth",
                        })
                      }
                    />
                  </Grid>

                  {/* 
                      <FormLabel component="legend"></FormLabel>

                      <TextField
                      <RadioGroup
                        aria-label="gender"
                        name="gender"
                        value={userDetails.gender}
                        onChange={handleInputChange}
                        row
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                        
                      </RadioGroup>

                    /> */}

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      error={!!error}
                      helperText={error}
                      id="Email"
                      name="Email"
                      label="Email"
                      variant="outlined"
                      value={email || userDetails.Email}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="mobileno"
                      name="mobileno"
                      label="Mobile Phone"
                      type="number"
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": { borderColor: "#063970" },
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={userDetails.phone}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* 
                  <Grid item xs={12} sm={6}>
                    <TextField
                      helperText="Organizations"
                      id="organizations"
                      name="organizations"
                      label="Organization Name"
                      variant="outlined"
                      value={orgDetails.orgName}
                      onChange={handleInputChange}
                    />
                  </Grid> */}

                    <Grid item xs={12} sm={6} >
                      <TextField
                        fullWidth
                        multiline
                        rows={orgDetails.length || 1}
                        helperText="List of Organizations"
                        id="organization-names"
                        name="organization-names"
                        label="Organization Names"
                        variant="outlined"
                        value={orgDetails.map((org) => org.orgName).join("\n")}
                        onChange={handleOrgDetailsChange}
                        disabled
                      />
                    </Grid>
                 

                  <Grid item xs={12} sm={6}>
                    <TextField
                      helperText="Please enter your GitHub profile link"
                      id="gitlink"
                      name="gitlink"
                      label="GitHub Profile Link"
                      variant="outlined"
                      value={userDetails.gitlink}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box onClick={navigateToChangePassword}>
                      <TextField
                        id="userPassword"
                        name="userPassword"
                        label="Click here to change the password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        value={userDetails.userPassword}
                        onChange={handleInputChange}
                        disabled
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      helperText="Please enter your skills (e.g., programming languages, tools, etc.)"
                      id="skills"
                      name="skills"
                      label="Skills"
                      variant="outlined"
                      multiline
                      rows={1}
                      value={userDetails.skills}
                      onChange={handleInputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        style: {
                          minHeight: "6rem", // Adjust min height as needed for a larger input area
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <UpdateCancel />
                  </Grid>
                </Grid>
              </Item>
            </form>
          </Box>
        </Box>
      </FormContainer>
    </ThemeProvider>
  );
}
