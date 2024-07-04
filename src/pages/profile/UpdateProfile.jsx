import React from "react";
import Sidebar from "../../Sidebar"; // Importing the sidebar component
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import ProfileformT from "./ProfileUpdateForm"; // Importing the profile update form component
const drawerWidth = 240; // Define the width of the drawer/sidebar


export default function Organization() {
  return (
    <div>
      
      {/* Main content area */}
      <Box
        sx={{ display: "grid", gridTemplateColumns: `${drawerWidth}px auto` }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            bgcolor: "background.default",
            p: 4,
            marginTop: 0,
            paddingTop: 0,
          }}
        >
          <Toolbar />
          {/* Rendering the profile update form */}
          <Paper>
            <ProfileformT />
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
