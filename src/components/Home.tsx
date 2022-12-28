import { useState } from "react";
import Job from "./Job";
import { IoIosAddCircle } from 'react-icons/io';

const Home = () => {
    const [jobList, setJobList] = useState<any[]>([]);


    const handleAddJob = () => {
        const key = jobList.length;
        const job = (
            <Job key={key} jobName={`Job ${key}`} />
        );
        setJobList([...jobList, job]);
    };

    return (
        <div className="container">
            <hr />
            <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ display: "inline-block", color: "gray", marginRight: "10px", fontWeight: "bold" }}>Add Job</p>
                <IoIosAddCircle fill="azure" size={30} onClick={handleAddJob} style={{ cursor: "pointer" }} />
            </div>
            <ul className="job-list">{jobList}</ul>
        </div>
    );
};

export default Home;
