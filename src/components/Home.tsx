import { useEffect, useState } from "react";
import Job from "./Job";
import axios from "axios";
import { IoIosAddCircle } from 'react-icons/io'; // eslint-disable-line @typescript-eslint/no-unused-vars

const Home = () => {
    const [jobList, setJobList] = useState<any[]>([]);

    const getData = async () => {
        const res = await axios.get('/jobs');
        const list = res.data.map((job: any, index: number) => {
            console.log(job)
            return (
                <Job key={index} jobId={job.jobid} jobName={job.jobname} programId={job.programid} timeInterval={job.timeinterval} url={job.url} />
            );
        });
        setJobList(list);
    };

    useEffect(() => {
        getData();
    }, []);


    const handleAddJob = async () => {
        const key = jobList.length;
        await axios.post('/jobs', {
            jobName: `Job ${key}`,
            programId: "",
            timeInterval: 10,
            url: "9"
        })
        getData();
    };

    return (
        <div className="container">
            <hr />
            <div style={{ display: "flex", alignItems: "center" }}>
                <p className="home-labels">Add Job</p>
                <IoIosAddCircle className="home-icon" size={30} onClick={handleAddJob} />
            </div>
            {jobList && <ul className="job-list">{jobList}</ul>}
        </div>
    );
};

export default Home;
