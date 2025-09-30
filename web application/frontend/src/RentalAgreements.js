
import React, { useState, useEffect } from 'react';

const API_URL = '<BACKEND-API-URL>'; // Update if your backend runs on a different port

// Helper to format date string as dd/MM/yyyy
function formatDate(dateStr) {
  if (!dateStr) return '';
  // If already formatted as yyyy-MM-dd, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const inputStyle = {
  margin: '0.5rem',
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  margin: '0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  border: 'none',
  background: '#1976d2',
  color: 'white',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  ...buttonStyle,
  background: '#d32f2f',
};

const editButtonStyle = {
  ...buttonStyle,
  background: '#388e3c',
};

function RentalAgreements() {
  const [agreements, setAgreements] = useState([]);
  const [form, setForm] = useState({
    tenant: '',
    landlord: '',
    startDate: '',
    endDate: '',
    monthlyRent: '',
    deposit: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(setAgreements);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      // Update
      fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: editingId })
      })
        .then(() => {
          setAgreements(agreements.map(a => a.id === editingId ? { ...form, id: editingId } : a));
          setEditingId(null);
          setForm({ tenant: '', landlord: '', startDate: '', endDate: '', monthlyRent: '', deposit: '' });
        });
    } else {
      // Create
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(newAgreement => {
          setAgreements([...agreements, newAgreement]);
          setForm({ tenant: '', landlord: '', startDate: '', endDate: '', monthlyRent: '', deposit: '' });
        });
    }
  };

  const handleEdit = agreement => {
    setEditingId(agreement.id);
    setForm({
      tenant: agreement.tenant,
      landlord: agreement.landlord,
      startDate: agreement.startDate?.slice(0, 10) || '',
      endDate: agreement.endDate?.slice(0, 10) || '',
      monthlyRent: agreement.monthlyRent,
      deposit: agreement.deposit
    });
  };

  const handleDelete = id => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setAgreements(agreements.filter(a => a.id !== id)));
    if (editingId === id) {
      setEditingId(null);
      setForm({ tenant: '', landlord: '', startDate: '', endDate: '', monthlyRent: '', deposit: '' });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ color: '#1976d2', marginBottom: '1rem' }}>{editingId ? 'Edit' : 'Register'} Rental Agreement</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
          <label htmlFor="tenant">Tenant:</label>
          <input id="tenant" name="tenant" placeholder="Tenant" value={form.tenant} onChange={handleChange} required style={inputStyle} />
          <label htmlFor="landlord">Landlord:</label>
          <input id="landlord" name="landlord" placeholder="Landlord" value={form.landlord} onChange={handleChange} required style={inputStyle} />
        </div>
  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
          <label htmlFor="startDate">Start Date:</label>
          <input id="startDate" name="startDate" type="text" placeholder="yyyy-MM-dd" value={form.startDate} onChange={handleChange} required style={inputStyle} />
          <label htmlFor="endDate">End Date:</label>
          <input id="endDate" name="endDate" type="text" placeholder="yyyy-MM-dd" value={form.endDate} onChange={handleChange} required style={inputStyle} />
        </div>
  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' }}>
          <label htmlFor="monthlyRent">Monthly Rent:</label>
          <input id="monthlyRent" name="monthlyRent" type="number" placeholder="Monthly Rent" value={form.monthlyRent} onChange={handleChange} required style={inputStyle} />
          <label htmlFor="deposit">Deposit:</label>
          <input id="deposit" name="deposit" type="number" placeholder="Deposit" value={form.deposit} onChange={handleChange} required style={inputStyle} />
        </div>
        <button type="submit" style={buttonStyle}>{editingId ? 'Update' : 'Add'} Agreement</button>
        {editingId && <button type="button" style={buttonStyle} onClick={() => { setEditingId(null); setForm({ tenant: '', landlord: '', startDate: '', endDate: '', monthlyRent: '', deposit: '' }); }}>Cancel</button>}
      </form>
      <h3 style={{ color: '#1976d2', marginBottom: '1rem' }}>Agreements</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {agreements.map(a => (
          <li key={a.id} style={{ background: '#fff', marginBottom: '1rem', padding: '1rem', borderRadius: '6px', boxShadow: '0 1px 4px #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>
              <strong>{a.tenant}</strong> - {a.landlord} <br />
              <span style={{ color: '#555' }}>({formatDate(a.startDate)} to {formatDate(a.endDate)})</span> <br />
              <span>Rent: <strong>{a.monthlyRent} €</strong> | Deposit: <strong>{a.deposit} €</strong></span>
            </span>
            <span>
              <button style={editButtonStyle} onClick={() => handleEdit(a)}>Edit</button>
              <button style={deleteButtonStyle} onClick={() => handleDelete(a.id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RentalAgreements;
