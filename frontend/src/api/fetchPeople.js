import axios from 'axios';
const baseUrl = 'https://localhost:5001';

const getAllPeople = async (searchString) => {
    return (await axios.get(`${baseUrl}/api/people/${searchString ?? ''}`)).data.people;
}

const savePerson = async (person) => {
    await axios.post(`${baseUrl}/api/people`,
    person);
}

const updatePerson = async (person, id) => {
    await axios.put(`${baseUrl}/api/people/${id}`,
    person);
}

const deletePerson = async (id) => {
    await axios.delete(`${baseUrl}/api/people/${id}`);
}

export default {
    getAllPeople,
    savePerson,
    updatePerson,
    deletePerson
}