import ModalBackdrop from "../ModalBackdrop/ModalBackdrop"

type Props = {
    closeModal: () => void
}

function ConfirmationModal({ closeModal }: Props) {
    return (
        <>
            <div className="mt-2 w-1/2 max-w-lg min-w-min fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 bg-white text-black py-8 px-5 md:px-10 border border-gray-400 rounded-lg">
                <h1 className="text-xl font-bold whitespace-nowrap">Your order has been created</h1>
                <p className="text-gray-600 mb-4">We will send you a confirmation email shortly.</p> 

                <button onClick={closeModal} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-700 transition duration-150 ease-in-out hover:bg-violet-600 bg-violet-700 rounded text-white px-8 py-2 text-sm">
                    Close
                </button>

                <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
            <ModalBackdrop closeModal={closeModal} />
        </>
    )
}

export default ConfirmationModal