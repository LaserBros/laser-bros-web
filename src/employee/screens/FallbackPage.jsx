// pages/FallbackPage.js
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Card, CardBody } from "react-bootstrap";

const FallbackPage = () => {
  return (
    <Card className="nopermission">
      <CardBody className="text-center py-5">
        <Icon icon="heroicons-outline:exclamation" width={80} height={80} color="#4F8CCA"/>
      <h1>Welcome!</h1>
      <p>You do not have access to the dashboard. Please contact your administrator.</p>

      </CardBody>
    </Card>
  );
};

export default FallbackPage;