import { Button, Drawer } from "@mui/material";
import React, { useState } from "react";
import ContactGrid from "./ContactGrid";
import ContactForm from "./ContactForm";
// import ContactForm from "./ContactForm";

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [id,setId] = useState([])

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const opendrawer = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Add Contact</Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <ContactForm toggleDrawer={toggleDrawer(false)} id={id} setId={setId} />
      </Drawer>
      <ContactGrid toggleDrawer={toggleDrawer(false)} id={id} setId={setId} opendrawer={opendrawer}/>
    </div>
  );
}
