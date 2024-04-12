import React from 'react';
import Testnet from './Projects/Testnet';

function ProjectsList() {
  return (
    <div>
      <h2>All Projects</h2>
      <div className="projects-list">
        <Testnet />
        {/* Add other project components here */}
      </div>
    </div>
  );
}

export default ProjectsList;
