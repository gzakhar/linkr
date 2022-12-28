import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState, useEffect } from "react";
import Modal from './Modal';
import * as web3 from "@solana/web3.js";
import { Message } from "../models/Message";
import { FaRunning } from 'react-icons/fa';
import { IoMdMan } from 'react-icons/io';

interface JobProps {
    jobName: string;
}

const _hashSimplified = (hash: string) => {
    return `${hash.substring(0, 5)}...`
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
            console.log(
                `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
            )
        } catch (e) {
            console.log(JSON.stringify(e))
            alert(JSON.stringify(e))
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
