import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Agent from "./Agent";
import { IAgent } from "../../types/Agent";
import axios from "axios";

const Agents: FC = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [filters, setFilters] = useState<IAgent[]>([]);
  const [searchInput, setSearchInput] = useState("");

  //Get all data about all agents from server.
  useEffect(() => {
      async function fetchInitialData() {
          try {
          const response = await axios.get("/agents");
          setAgents(response.data);
          setFilters(response.data);
          } catch (err) {
            console.log(err);
            alert('Server have a problem or you are not connected to network');
          }
      }
      fetchInitialData();
  }, []);

  //Process all change event from all input field.
  const handleChange = (e : any) : void => {
    e.preventDefault();
    const value : String = e.target.value;
    setSearchInput(e.target.value);
    if (value == '') {
      setFilters(agents);
    } else {
      const newFilters = agents.filter(agent => {
        const tempAreas : String = agent.practiceAreas.toLowerCase();
        const tempSearch : String = searchInput.toLowerCase();
        return tempAreas.indexOf(tempSearch.toString()) != -1;
      });
      setFilters(newFilters);
    }
  };

  return (
    <div>
      <div className="searchGroup">
        <input
          className="search"
          type="text"
          placeholder="Search here"
          onChange={handleChange}
          value={searchInput}/>
        <Link to='/createAgent' className='btn btn-primary my-1'>
                Join the team
        </Link>
      </div>
      <div className="agents">
        {filters.map((agent) => (
          <Agent key={agent.id} agent={agent}/>
        ))}
      </div>
    </div>
  );
};

export default Agents;
