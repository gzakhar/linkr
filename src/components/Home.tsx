import { useState } from "react";
import Job from "./Job";

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
        <div>
            <button onClick={handleAddJob}>Add Job</button>
            <ul className="job-list">{jobList}</ul>
        </div>
    );
};

export default Home;
