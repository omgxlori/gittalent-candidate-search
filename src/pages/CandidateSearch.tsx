import { useState, useEffect } from 'react';
import { fetchRandomUser } from '../api/API';
import CandidateCard from '../components/CandidateCard';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getRandomUser = async () => {
    setError(null);
    try {
      const user = await fetchRandomUser();
      if (user) {
        setCandidate(user);
      } else {
        setError('Failed to fetch a random user. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    }
  };

  // Function to save the candidate to local storage
  const saveCandidate = () => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    if (candidate) {
      savedCandidates.push(candidate);
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
      console.log('Candidate saved:', candidate);
      getRandomUser();
    }
  };
  

  useEffect(() => {
    getRandomUser();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Candidate Search</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {candidate ? (
        <CandidateCard
          key={candidate.id}
          {...candidate}
          saveCandidate={saveCandidate}
          getNextCandidate={getRandomUser}
        />
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={getRandomUser} style={{ marginTop: '20px' }}>
        Get Another Random Candidate
      </button>
    </div>
  );
};

export default CandidateSearch;
