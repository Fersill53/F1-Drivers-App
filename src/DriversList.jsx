import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DriversList() {
  const [drivers, setDrivers] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('https://f1-drivers-api.onrender.com/drivers')
      .then((res) => res.json())
      .then((data) => setDrivers(data))
      .catch((err) => console.error('Error fetching drivers:', err));
  }, []);

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(search.toLowerCase()) ||
    driver.team.toLowerCase().includes(search.toLowerCase())
  );

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    if (!sortField) return 0;
    const valA = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
    const valB = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">F1 Drivers (2024)</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name or team"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={() => handleSort('points')}>
          Sort by Points
        </button>
        <button className="btn btn-primary me-2" onClick={() => handleSort('name')}>
          Sort by Name
        </button>
        <button className="btn btn-primary" onClick={() => handleSort('carNumber')}>
          Sort by Car #
        </button>
      </div>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Car #</th>
            <th>Name</th>
            <th>Team</th>
            <th>Country</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedDrivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.carNumber}</td>
              <td>
                <Link to={`/drivers/${driver.id}`}>{driver.name}</Link>
              </td>
              <td>{driver.team}</td>
              <td>{driver.country}</td>
              <td>{driver.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DriversList;
