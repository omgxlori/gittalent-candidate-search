import React from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

// Extend the props to include the functions
interface CandidateCardProps extends Candidate {
  saveCandidate: () => void;
  getNextCandidate: () => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  login,
  avatar_url,
  html_url,
  location,
  email,
  company,
  bio,
  saveCandidate,
  getNextCandidate,
}) => {
  return (
    <div className="candidate-card">
      <img src={avatar_url} alt={login} className="candidate-avatar" />
      <div className="candidate-info">
        <h2 className="candidate-name">
          <a href={html_url} target="_blank" rel="noopener noreferrer">
            {login}
          </a>
        </h2>
        {location && <p>Location: {location}</p>}
        {email && <p>Email: <a href={`mailto:${email}`}>{email}</a></p>}
        {company && <p>Company: {company}</p>}
        {bio && <p>Bio: {bio}</p>}
      </div>
      <div className="action-buttons">
        <button onClick={getNextCandidate} className="button-red">-</button>
        <button onClick={saveCandidate} className="button-green">+</button>
      </div>
    </div>
  );
};

export default CandidateCard;
