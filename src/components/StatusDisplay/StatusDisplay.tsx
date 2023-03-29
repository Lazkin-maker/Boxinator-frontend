import Status from "../../enums/status"

type Props = {
    statusList: string[]
}

function StatusDisplay({ statusList }: Props) {

    const status = statusList[statusList.length - 1];

    return status === Status.CREATED ? (
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
            <span className="relative">{status}</span>
        </span>
    ) : status === Status.RECEIVED ? (
        <span className="relative inline-block px-3 py-1 font-semibold text-violet-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-violet-200 opacity-50 rounded-full"></span>
            <span className="relative">{status}</span>
        </span>
    ) : status === Status.INTRANSIT ? (
        <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
            <span className="relative">{status}</span>
        </span>
    ) : status === Status.COMPLETED ? (
        <span className="relative inline-block px-3 py-1 font-semibold text-zinc-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-zinc-200 opacity-50 rounded-full"></span>
            <span className="relative">{status}</span>
        </span>
    ) : status === Status.CANCELLED ? (
        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
            <span className="relative">{status}</span>
        </span>
    ) : (
        <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-violet-200 opacity-50 rounded-full"></span>
            <span className="relative">UNKNOWN</span>
        </span>
    )
}

export default StatusDisplay