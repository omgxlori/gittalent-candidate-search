import { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from local storage when the component mounts
  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  // Function to remove a candidate from the list
  const removeCandidate = (index: number) => {
    const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };
  

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.length > 0 ? (
            savedCandidates.map((candidate, index) => (
              <tr key={candidate.id}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.login} className="candidate-avatar" />
                </td>
                <td>
                  <strong>{candidate.login}</strong> <br />
                  <em>({candidate.login})</em>
                </td>
                <td>{candidate.location || 'N/A'}</td>
                <td>
                  {candidate.email ? (
                    <a href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td>
                  <button onClick={() => removeCandidate(index)} className="button-red">-</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No candidates saved yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
