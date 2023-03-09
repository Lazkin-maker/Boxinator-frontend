type Props = {
  closeModal: () => void
}

function ModalBackdrop({ closeModal }: Props) {
  return (
    <div onClick={closeModal} className="fixed inset-0 bg-black opacity-50 z-10" />
  )
}

export default ModalBackdrop