// pages/NotAuthorized.js
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Card, CardBody } from "react-bootstrap";

const NotAuthorized = () => {
  return (
       <Card className="nopermission">
       <CardBody className="text-center py-5">
         <Icon icon="heroicons-outline:exclamation" width={80} height={80} color="#4F8CCA"/>
         <h1>Not Authorized</h1>
         <p>You do not have permission to access this page.</p>
 
       </CardBody>
     </Card>
  );
};

export default NotAuthorized;