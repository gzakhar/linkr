import { useState } from "react";
import Modal from 'react-modal';
import axios from 'axios';

interface ModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: (isOpen: boolean) => void;
    jobId: number;
    setJobName: (name: string) => void;
    jobName: string;
    setJobTimeInterval: (timeInterval: number) => void;
    jobTimeInterval: number;
    setJobProgramId: (programId: string) => void;
    jobProgramId: string;
    setJobData: (data: string) => void;
    jobData: string;
}

const MyModal = ({
    modalIsOpen,
    setModalIsOpen,
    jobId,
    setJobName,
    jobName,
    setJobTimeInterval,
    jobTimeInterval,
    setJobProgramId,
    jobProgramId,
    setJobData,
    jobData,
}: ModalProps) => {

    const [name, setName] = useState<string>(jobName);
    const [timeInterval, setTimeInterval] = useState<number>(jobTimeInterval);
    const [programId, setProgramId] = useState<string>(jobProgramId);
    const [data, setData] = useState<string>(jobData);


    const handleSubmit = async () => {
        setModalIsOpen(false)
        const res = await axios.put(`/jobs/${jobId}`, {
            jobName: name,
            programId: programId,
            timeInterval: timeInterval,
            data: data
        })

        setJobName(res.data.jobname)
        setJobProgramId(res.data.programid)
        setJobTimeInterval(res.data.timeinterval)
        setJobData(res.data.url|| " ")
    }

    const handleDelete = async () => {
    
        setModalIsOpen(false)
        const res = await axios.delete(`/jobs/${jobId}`)
        console.log(res.data)
    }

    return (
        <Modal
            ariaHideApp={false}
            isOpen={modalIsOpen}
            style={{
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    width: "300px",
                }
            }}
        >
            <form style={{ display: "flex", flexDirection: "column" }}>
                <h2>Edit Job</h2>
                <p style={{ margin: "2px 0px 4px 0px" }}>Name of the Job.</p>
                <input
                    style={{ marginBottom: "10px" }}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <hr style={{ width: "100%" }} />
                <p style={{ margin: "2px 0px 4px 0px" }}>Solana program ID.</p>
                <input
                    disabled
                    style={{ marginBottom: "10px" }}
                    type="text"
                    value={programId}
                    onChange={(e) => setProgramId(e.target.value)}
                />
                <hr style={{ width: "100%" }} />
                <p style={{ margin: "2px 0px 4px 0px" }}>Solana program ID.</p>
                <div>
                    <input
                        type="number"
                        value={timeInterval.toString()}
                        onChange={(e) => setTimeInterval(parseFloat(e.target.value))}
                        style={{ marginBottom: "20px", display: "inline-block", }}
                    /> - seconds
                </div>
                <hr style={{ width: "100%" }} />
                <p style={{ margin: "2px 0px 4px 0px" }}>Data.</p>
                <input
                    style={{ marginBottom: "10px" }}
                    type="text"
                    onChange={(e) => setData(e.target.value)}
                    value={data}
                />
            </form>
            <div style={{ display: "flex", justifyContent: "right" }}>
                <button className="danger-button" onClick={handleDelete}>Delete</button>
                <button onClick={() => setModalIsOpen(false)}>Cancel</button>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </Modal>
    )

}

export default MyModal;