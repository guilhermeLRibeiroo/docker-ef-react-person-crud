import React from 'react';
import './People.css';
import { Table, Button, Modal, Form, Row, Col } from 'react-bootstrap';

import useModal from '../util/useModal';
import fetchPeople from '../../api/fetchPeople';

function People() {
  const modal = useModal();
  const person = usePerson();
  const [people, setPeople] = React.useState([]);

  const getAll = async (search) => setPeople(await fetchPeople.getAllPeople(search));

  const handleClose = () => {
    person.clear();
    modal.setModalShow(false);
  }

  const handleSave = async () => {
    let toSaveOrUpdatePerson = {
      firstName: person.firstName,
      lastName: person.lastName
    };
    if (person.id)
      await fetchPeople.updatePerson(toSaveOrUpdatePerson, person.id);
    else
      await fetchPeople.savePerson(toSaveOrUpdatePerson);

    person.clear();
    getAll();
  }

  const handleUpdate = async (_person) => {
    person.setPerson(_person);
    await modal.handleShow();
  }

  const handleDelete = async (id) => {
    await fetchPeople.deletePerson(id);
    getAll();
  }

  React.useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="People">
      <div className="header">
        <h1>People</h1>
        <Button variant="success" onClick={evt => modal.handleShow()}>Add Person</Button>
      </div>
      <Row>
        <Col xs={{span: 10, offset: 1}} style={{"marginBottom": "10px"}}>
          <Form onSubmit={e => e.preventDefault()}>
            <Form.Label>Search..</Form.Label>
            <Form.Control onChange={evt => getAll(evt.target.value)}></Form.Control>
          </Form>
        </Col>
      </Row>

      <Table bordered hover>
        <thead>
          <tr>
            <th className="text-centered">First Name</th>
            <th className="text-centered">Last Name</th>
            <th className="text-centered">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            people.map(person => {
              return <tr key={person.id}>
                <td className="text-centered">{person.firstName}</td>
                <td className="text-centered">{person.lastName}</td>
                <td>
                  <div className="actions">
                    <Button variant="warning" onClick={async () => await handleUpdate(person)}>Update</Button>
                    <Button variant="danger" onClick={async () => handleDelete(person.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>

      <Modal show={modal.modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Person</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter first name" value={person.firstName} onChange={event => person.handleFirstNameChange(event.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Enter last name" value={person.lastName} onChange={event => person.handleLastNameChange(event.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={async () => { await handleSave(); handleClose() }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default People;

const usePerson = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [id, setId] = React.useState(null);

  const handleFirstNameChange = (value) => setFirstName(value);
  const handleLastNameChange = (value) => setLastName(value);

  const clear = () => {
    setFirstName('');
    setLastName('');
    setId(null);
  }

  const setPerson = (person) => {
    setFirstName(person.firstName);
    setLastName(person.lastName);
    setId(person.id);
  }

  return {
    firstName, setFirstName,
    lastName, setLastName,
    id, setId,
    handleFirstNameChange,
    handleLastNameChange,
    clear, setPerson
  }
}