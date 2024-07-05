import React, { useState } from "react";
import { Drawer, IconButton, List, ListItem, Typography, Switch } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, UserCircleIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <>
      <IconButton variant="text" size="lg" onClick={toggleDrawer}>
        {isDrawerOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} size="w-64">
        <List>
          <ListItem>
            <UserCircleIcon className="h-5 w-5 mr-2" />
            Profile
          </ListItem>
          {/* Add more navigation links here */}
        </List>
        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center justify-between">
            <Typography>Dark Theme</Typography>
            <Switch checked={isDarkTheme} onChange={toggleTheme} />
          </div>
          <div className="flex justify-between mt-4">
            <button className="py-2 px-4 bg-blue-500 text-white rounded">Log In</button>
            <button className="py-2 px-4 bg-gray-500 text-white rounded">Log Out</button>
          </div>
        </div>
      </Drawer>
    </>
  );
}