import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { getAllStories, addStory } from './apihelper';

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [stories, setStories] = useState([]);
  const [res, setResponse] = useState('');
  const [storyDetails, setStoryDetails] = useState({
    title: '',
    description: '',
    user: '',
  });

  useEffect(() => {
    getData();
  }, [stories]);

  const getData = () => {
    getAllStories().then(({ data }) => setStories(data.stories));
  };

  const add = (e) => {
    e.preventDefault();
    addStory(storyDetails).then(({ data }) => {
      setResponse(data.message);
      handleClose();
    });
  };

  return (
    <div className="container text-center mt-4">
      <h3>All Stories</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {stories.map((story, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{story.title}</td>
              <td>{story.description}</td>
              <td>{story.user}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button className="btn btn-primary" onClick={handleShow}>
        Add Story
      </Button>
      <br />
      <p>{res}</p>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                onChange={(e) =>
                  setStoryDetails({ ...storyDetails, title: e.target.value })
                }
                type="text"
                placeholder=" Title"
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                onChange={(e) =>
                  setStoryDetails({
                    ...storyDetails,
                    description: e.target.value,
                  })
                }
                type="text"
                placeholder="Description"
              />
            </Form.Group>

            <Form.Group controlId="user">
              <Form.Label>User</Form.Label>
              <Form.Control
                name="user"
                onChange={(e) =>
                  setStoryDetails({ ...storyDetails, user: e.target.value })
                }
                type="text"
                placeholder="User's Name"
              />
            </Form.Group>

            <Button onClick={add} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
