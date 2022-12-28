import * as borsh from "@project-serum/borsh"


export class Message {
    message: string

    constructor(
        message: string,
    ) {
        this.message = message
    }

    private instructionLayout = borsh.struct([
        borsh.str("message"),
    ])

    serialize(): Buffer {
        const buffer = Buffer.alloc(1000)
        this.instructionLayout.encode({ ...this }, buffer)
        return buffer.slice(0, this.instructionLayout.getSpan(buffer))
    }

}