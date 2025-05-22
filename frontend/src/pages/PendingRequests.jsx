// File: frontend/src/pages/PendingRequests.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRequests(res.data);
    } catch {
      alert('Failed to load requests');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/requests/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchRequests(); // refresh list
    } catch {
      alert('Failed to update request');
    }
  };

  return (
    <div>
      <h2>Pending Access Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map(req => (
          <div key={req.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
            <p><b>User:</b> {req.user.username}</p>
            <p><b>Software:</b> {req.software.name}</p>
            <p><b>Access:</b> {req.accessType}</p>
            <p><b>Reason:</b> {req.reason}</p>
            <button onClick={() => updateStatus(req.id, 'Approved')}>Approve</button>
            <button onClick={() => updateStatus(req.id, 'Rejected')}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingRequests;
