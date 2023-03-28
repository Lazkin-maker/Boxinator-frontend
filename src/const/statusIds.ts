import Status from "../enums/status";

const statusIds = new Map([
	[Status.CREATED, 1],
	[Status.RECEIVED, 2],
	[Status.INTRANSIT, 3],
	[Status.COMPLETED, 4],
	[Status.CANCELLED, 5]
])

export default statusIds;