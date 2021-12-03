import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import Navbar from "./navbar";
import { backendServer } from "../webConfig.js";
import axios from "axios";

export default function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // useEffect(() => {
  //     const token = localStorage.getItem('token')
  //     if(token)
  //     {
  //         history.push('/dashboard')
  //     }
  // })
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        localStorage.setItem("token", userCredential._tokenResponse.idToken);
      })
      .then(() => {
        const data = {
          email: Email,
        };
        axios.get(`${backendServer}/login/${Email}`).then((response) => {
          console.log("result login", response.data);

          // localStorage.setItem("brand", response.data.brandname);
          localStorage.setItem("brand", "Adidas");
          if (localStorage.getItem("brand")) {
            window.location.href = "/homepage";
          }
        });
        // if(localStorage.getItem('brand'))
        // {
        //   window.location.href = '/homepage';
        // }
      })
      .catch((e) => alert(e.message))
      .finally(() => {
        setLoading(false);
      });

    setLoading(false);
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <Navbar></Navbar>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "400px" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="Email"
                    required
                  />
                </Form.Group>
                <Form.Group
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                  id="password"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="Password"
                    required
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  {loading ? "Please Wait..." : "Log In"}
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
