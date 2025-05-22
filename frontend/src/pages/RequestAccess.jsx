import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestAccess = () => {
  const [softwareList, setSoftwareList] = useState([]);
  const [softwareId, setSoftwareId] = useState('');
  const [accessType, setAccessType] = useState('Read');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to access this page');
      return;
    }
    axios
      .get('http://localhost:5000/api/software', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Software list:', res.data);
        setSoftwareList(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error('Error fetching software:', err.response || err);
        if (err.response?.status === 401) {
          alert('Unauthorized. Please log in again.');
        } else {
          alert('Failed to load software list');
        }
      });
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!softwareId || !reason) {
      alert('Please fill in all fields');
      return;
    }
    try {
      await axios.post(
        'http://localhost:5000/api/requests',
        {
          softwareId,
          accessType,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Access request submitted');
      setSoftwareId('');
      setAccessType('Read');
      setReason('');
    } catch (err) {
      console.error('Error submitting request:', err.response || err);
      if (err.response?.status === 401) {
        alert('Unauthorized. Please log in again.');
      } else {
        alert('Request failed');
      }
    }
  };

  return (
    <form onSubmit={handleRequest}>
      <h2>Request Software Access</h2>
      <select value={softwareId} onChange={(e) => setSoftwareId(e.target.value)} required>
        <option value="">Select Software</option>
        {softwareList.length === 0 ? (
          <option value="" disabled>
            No software available
          </option>
        ) : (
          softwareList.map((soft) => (
            <option key={soft.id} value={soft.id}>
              {soft.name}
            </option>
          ))
        )}
      </select>
      <select value={accessType} onChange={(e) => setAccessType(e.target.value)} required>
        <option value="Read">Read</option>
        <option value="Write">Write</option>
        <option value="Admin">Admin</option>
      </select>
      <textarea
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      />
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestAccess;