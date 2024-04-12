import React, { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';
import '../css/Testnet.css'

const MASTER_URL = 'https://api-ap-south-1.hygraph.com/v2/cls6f05ap0lb101uqkobsy146/master';

function Testnet() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = gql`
          query getTestnets {
            testnets(first: 50, orderBy: publishedAt_DESC) {
              id
              name
              banner {
                url
              }
            }
          }
        `;

        const result = await request(MASTER_URL, query);
        setProjects(result.testnets);
      } catch (error) {
        console.error('Error fetching Testnet projects:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="projects-container">
      <h2 className="projects-heading">Testnet Projects</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <img src={project.banner.url} alt={project.name} className="project-banner" />
            <h3 className="project-title">{project.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testnet;
