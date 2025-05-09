import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DriverDetail() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://f1-drivers-api-production.up.railway.app/drivers${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Driver not found')
        }
        return res.json();
      })
      .then((data) => {
        setDriver(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>{driver.name}</h2>
        </div>
        <div className="card-body">
          <div className="mb-3 text-center">
            <img
              src={driver.driverPhotoUrl}
              alt={`${driver.name}`}
              className="img-fluid rounded mb-3"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="mb-3 text-center">
            <img
              src={driver.carPhotoUrl}
              alt={`${driver.team} car`}
              className="img-fluid rounded"
              style={{ maxWidth: '400px' }}
            />
          </div>
          <p><strong>Car #:</strong> {driver.carNumber}</p>
          <p><strong>Team:</strong> {driver.team}</p>
          <p><strong>Country:</strong> {driver.country}</p>
          <p><strong>Points:</strong> {driver.points}</p>
          <Link className="btn btn-primary mt-3" to="/">
            ← Back to Drivers List
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DriverDetail;
