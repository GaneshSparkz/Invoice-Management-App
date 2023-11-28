import React from 'react';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
  return (
    <Alert variant="danger" className="text-center mt-5">
      <Alert.Heading>Error 404! Not Found!</Alert.Heading>
      <p>The requested {props.resource || 'resource'} is not found!</p>
      <hr />
      <Link to={'/'} className="alert-link">Go to Homepage</Link>
    </Alert>
  );
};

export default NotFound;
