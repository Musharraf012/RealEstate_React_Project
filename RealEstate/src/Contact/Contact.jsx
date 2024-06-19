import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import ContactGrid from "./ContactGrid";
// import ContactForm from "./ContactForm";

export default function Contact() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <ContactForm />
      </Drawer>
      <ContactGrid />
    </div>
  );
}
