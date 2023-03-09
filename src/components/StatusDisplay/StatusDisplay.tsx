import Status from "../../enums/status.enum"

type Props = {
    status: string
}

function StatusDisplay({ status }: Props) {

    return status === Status.CREATED ? (
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
            <span className="relative">{status}</span>
        </span>
    ) : status === Status.RECEIVED ? (
        <span className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
            <span aria-hidden className="absolute inset-0 bg-blue-200 opacity-50 rounded-full"></span>
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
            <span aria-hidden className="absolute inset-0 bg-gray-200 opacity-50 rounded-full"></span>
            <span className="relative">{status}</span>
        </span>
    )
}

export default StatusDisplay