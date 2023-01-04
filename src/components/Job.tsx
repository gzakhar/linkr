import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import Modal from './Modal';
import * as web3 from "@solana/web3.js";
import { Message } from "../models/Message";
import { FaRunning } from 'react-icons/fa';
import { IoMdMan } from 'react-icons/io';
import { Store } from 'react-notifications-component'

interface JobProps {
    jobName: string;
}

const _hashSimplified = (hash: string, places: number = 5, dots: number = 3) => {
    return `${hash.substring(0, places)}${'.'.repeat(dots)}`
}

const Job = ({ jobName }: JobProps) => {
    const [realJobName, setJobName] = useState<string>(jobName);
    const [programId, setProgramId] = useState<string>("")
    // const programId = "9k8ZMZxY25oCCwiEbKoRk45H42ZLQyCziaC4pgEmMHMv";
    const [timeInterval, setTimeInterval] = useState<number>(60);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [jobActive, setJobActive] = useState<boolean>(false);
    const [timesRun, setTimesRun] = useState<number>(0);
    const [data, setData] = useState<string>("");
    // const [showDetails, setShowDetails] = useState<boolean>(false);

    const { connection } = useConnection()
    const { publicKey, sendTransaction } = useWallet()

    useEffect(() => {
        const interval = setInterval(() => {
            if (jobActive) runJob();
        }, timeInterval * 1000);
        return () => clearInterval(interval);
    }, [jobActive, timesRun, realJobName])

    const runJob = () => {
        setTimesRun(timesRun + 1);
        console.log(`Name: ${realJobName}, Runs: ${timesRun}`);

        handleSubmitTransaction();
    }


    const handleSubmitTransaction = async () => {
        if (!publicKey) return;

        const message = new Message(data);

        const transaction = new web3.Transaction()

        const instruction = new web3.TransactionInstruction({
            programId: new web3.PublicKey(programId),
            keys: [],
            data: message.serialize()
        })

        transaction.add(instruction)

        try {
            const txid = await sendTransaction(transaction, connection)
            Store.addNotification({
                title: "Transaction Sent",
                message: <p>View on Explorer: <a
                    style={{ textDecoration: "none" }}
                    href={`https://explorer.solana.com/tx/${txid}?cluster=devnet`}
                    rel="noreferrer"
                    target="_blank">{_hashSimplified(txid, 15, 0)}
                </a></p>,
                type: "success",
                insert: "top",
                container: "bottom-left",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: true,
                    pauseOnHover: true
                }
            })
        } catch (e) {
            Store.addNotification({
                title: "Transaction failed",
                message: `Transaction failed with error: ${e}`,
                type: "danger",
                insert: "top",
                container: "bottom-left",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 6000,
                    onScreen: true
                }
            })
        }

    }

    return (
        <li className="job">
            {jobActive ? <FaRunning size={30} /> : <IoMdMan size={30} />}
            <p>{realJobName}</p>
            <p>Job Runs: {timesRun}</p>
            <p>ProgramId: {_hashSimplified(programId)}</p>
            <button className="button" onClick={() => setJobActive(!jobActive)}>
                {jobActive ? "Stop" : "Start"}
            </button>
            <button className="button" onClick={() => setModalIsOpen(true)}>
                Edit
            </button>
            {/* <button className="button" onClick={() => setShowDetails(!showDetails)} >Show</button> */}
            <Modal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                setJobName={setJobName}
                jobName={realJobName}
                setJobTimeInterval={setTimeInterval}
                jobTimeInterval={timeInterval}
                setJobProgramId={setProgramId}
                jobProgramId={programId || "9k8ZMZxY25oCCwiEbKoRk45H42ZLQyCziaC4pgEmMHMv"}
                setJobData={setData}
                jobData={data}

            />

        </li>
    );
};

export default Job;
