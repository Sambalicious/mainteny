import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Layout from './components/Layout';
import Table from './components/Table';

function App() {

  const fetchData = async () => {
    let response = await axios.get('/api/students');

    console.log(response.data);
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="App">
      <Layout>
        <Table />
      </Layout>
    </div>
  );
}

export default App;
