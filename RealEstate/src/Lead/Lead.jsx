import React, { useState } from "react";
import LeadGrid from "./LeadGrid";
import LeadForm from "./LeadForm";
import { Button, Drawer } from "@mui/material";

export default function Lead() {
  const [open, setOpen] = useState(false);
  const [selectedId, setId] = useState([]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const opendrawer = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Add Lead</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <LeadForm
          toggleDrawer={toggleDrawer(false)}
          selectedId={selectedId}
          setId={setId}
        />
      </Drawer>

      <LeadGrid
        selectedId={selectedId}
        setId={setId}
        toggleDrawer={toggleDrawer}
        opendrawer={opendrawer}
      />
    </div>
  );
}
