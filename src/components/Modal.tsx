import { useState } from "react";
import Modal from 'react-modal';

interface ModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: (isOpen: boolean) => void;
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
    setJobName,
    jobName,
    setJobTimeInterval,
    jobTimeInterval,
    setJobProgramId,
    jobProgramId,
    setJobData,
    jobData,
}: ModalProps) => {

    const [realJobName, setRealJobName] = useState<string>(jobName);
    const [timeInterval, setTimeInterval] = useState<number>(jobTimeInterval);
    const [programId, setProgramId] = useState<string>(jobProgramId);
    const [data, setData] = useState<string>(jobData);


    const handleSubmit = () => {
        setModalIsOpen(false)
        setJobName(realJobName);
        setJobTimeInterval(timeInterval);
        setJobProgramId(programId);
        setJobData(data);
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
                    value={realJobName}
                    onChange={(e) => setRealJobName(e.target.value)}
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
                <button onClick={() => setModalIsOpen(false)}>Cancel</button>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </Modal>
    )

}

export default MyModal;