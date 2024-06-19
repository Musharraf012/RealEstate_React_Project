import React, { useState } from "react";
import LeadGrid from "./LeadGrid";
import LeadForm from "./LeadForm";
import { Button, Drawer } from "@mui/material";

export default function Lead() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Add Lead</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <LeadForm />
      </Drawer>

      <LeadGrid />
    </div>
  );
}
