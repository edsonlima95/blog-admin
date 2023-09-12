"use client"

type ConfirmModalProps = {
  modalId: string
  title?: string
  description?: string
}

function ConfirmModal({
  title = "Titulo do modal",
  modalId,
  description
}: ConfirmModalProps) {
  return (
    <dialog id={`${modalId}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{description}</p>
        <div className="modal-action">
          <form method="dialog flex">
            <button id="btn-cofirm" className="btn btn-success text-white mr-5">
              Excluir
            </button>
            <button className="btn btn-error text-white">Fechar</button>
          </form>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmModal
