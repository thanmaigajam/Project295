import React, { useRef, useState ,useEffect} from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { Container } from "react-bootstrap"
import Navbar from "./navbar"

import {getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
export default function Signup() {
  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token)
    {
        history.push('/dashboard')
    }
})
  
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);
    console.log(Name,Email,Password)
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,Email,Password)
    .then(() => {
        updateProfile(auth.currentUser,{displayName : Name})
        .then(() => history.push('/'))
        .catch((e) => alert(e.message))
         
    }).catch((e) => alert(e.message))
    .finally(() => setLoading(false))
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError("Passwords do not match")
    // }

    // try {
    //   setError("")
    //   setLoading(true)
    //   await signup(emailRef.current.value, passwordRef.current.value)
    //   history.push("/")
    // } catch {
    //   setError("Failed to create an account")
    // }

    setLoading(false)
  }

  return (
      <div style = {{marginTop : "80px"}}>
          <Navbar></Navbar>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "400px" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="Name" style={{paddingTop:"10px"}}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="Name" value={Name} onChange={e => setName(e.target.value)} name="Name" required />
            </Form.Group>
            <Form.Group id="Email" style={{paddingTop:"10px"}}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="Email" value={Email} onChange={e => setEmail(e.target.value)} name="Email" required />
            </Form.Group>
            <Form.Group id="password" style={{paddingBottom:"10px",paddingTop:"10px"}} >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={Password} onChange={e => setPassword(e.target.value)} name="Password" required />
            </Form.Group>
           
            <Button disabled={loading} className="w-100" type="submit">
             {loading?'Creating User...': 'Sign Up'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </div>
    </Container>
    </div>
  )
}