import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/group/${id}`);
      const updatedGroups = groups.filter(group => group.id !== id);
      setGroups(updatedGroups);
    } catch (error) {
      console.error(`Error deleting group with id ${id}:`, error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const groupList = groups.map(group => {
    const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
    return (
      <tr key={group.id}>
        <td style={{ whiteSpace: 'nowrap' }}>{group.name}</td>
        <td>{address}</td>
        <td>
          {group.events.map(event => (
            <div key={event.id}>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              }).format(new Date(event.date))}: {event.title}
            </div>
          ))}
        </td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={`/groups/${group.id}`}>
              Edit
            </Button>
            <Button size="sm" color="danger" onClick={() => remove(group.id)}>
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <div className="float-end">
          <Button color="success" tag={Link} to="/groups/new">
            Add Group
          </Button>
        </div>
        <h3>My Group List</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Location</th>
              <th>Events</th>
              <th width="10%">Actions</th>
            </tr>
          </thead>
          <tbody>{groupList}</tbody>
        </Table>
      </Container>
    </div>
  );
};

export default GroupList;
