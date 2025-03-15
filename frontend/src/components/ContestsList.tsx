import { useEffect, useState } from "react";
import axios from "axios";

interface Contest {
  id : String
  platform : String;
  name : String;
  start : String

}

export const ContestsList = () => {
  const [contests, setContests] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 50;
const [totalPages, setTotalPages] = useState(0);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchContests = async () => {
    setLoading(true)
  try {
      const res = await axios.get(`http://localhost:5000/contests?page=${currentPage}&limit=${itemsPerPage}`);
      setContests(res.data.contests);
      setTotalPages(res.data.totalPages);
    }
  catch(err) {
    console.log(err);
  }
  finally{
    setLoading(false);
  }
}

  fetchContests();
}, [currentPage]);

if(loading) return <p>Loading new data</p>
return (
  <div>
    {contests.map((contest:Contest) => (
      <div key={contest.name}>
        <p>
          {contest.name}
        </p>
         <p>
          {contest.platform} - {contest.status}
        </p>
        
      </div>
    ))}

    <div>
      <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
        Prev
      </button>
      <span> Page {currentPage} / {totalPages} </span>
      <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  </div>
)}
