import { Tag } from "../Tag/Tag"

interface ModalProps {
    id: string
    title: string,
    children: React.ReactNode
}

export function Modal ({ id, title, children }: ModalProps) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box overflow-hidden">

                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-primary text-white absolute right-2 top-4">✕</button>
                </form>
                <Tag>{title}</Tag>

                <div className="min-h-[200px]">
                    {children}
                </div>
            </div>
        </dialog>
    )
}