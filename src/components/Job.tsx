import { useState, useEffect } from "react";
import Modal from 'react-modal';

interface JobProps {
    jobName: string;
}

const _hashSimplified = (hash: string) => {
    return `${hash.substring(0, 5)}...`
}

const Job = ({ jobName }: JobProps) => {
    const [realJobName, setRealJobName] = useState<string>(jobName);
    const [programId, setProgramId] = useState<string>("");
    const [timeInterval, setTimeInterval] = useState<number>(1);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [jobActive, setJobActive] = useState<boolean>(false);
    const [timesRun, setTimesRun] = useState<number>(0);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(programId);
        console.log(timeInterval);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (jobActive) runJob();
        }, timeInterval * 1000);
        return () => clearInterval(interval);
    }, [jobActive, timesRun, realJobName])

    const runJob = () => {
        setTimesRun(timesRun + 1);
        console.log(`Name: ${realJobName}, Runs: ${timesRun}`);
    }

    return (
        <li className="job">
            <p>{jobActive ? '√' : 'x'}</p>
            <p>{realJobName}</p>
            <p>Times Run: {timesRun}</p>
            <p>ProgramId: {programId == "" ? "__" : _hashSimplified(programId)}</p>
            <button onClick={() => setJobActive(!jobActive)}>
                ToggleJob
            </button>
            <button onClick={() => setModalIsOpen(true)}>
                Edit
            </button>
            <Modal
                isOpen={modalIsOpen}
            >
                <form id="form1" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder={"Job Name"}
                        onChange={(e) => setRealJobName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Program Id"
                        onChange={(e) => setProgramId(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Time Interval"
                        onChange={(e) => setTimeInterval(parseFloat(e.target.value))}
                    />
                </form>
                <button onClick={() => setModalIsOpen(false)}>Submit</button>
            </Modal>

        </li>
    );
};

export default Job;
