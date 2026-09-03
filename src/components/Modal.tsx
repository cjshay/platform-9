import { type ReactNode } from 'react'

export function Modal({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/55 p-4 py-10"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="w-full max-w-lg rounded-lg border border-amber/20 bg-ink-soft p-6 shadow-2xl">
        {children}
      </div>
    </div>
  )
}

export function ModalHeader({ title, onClose }: { title: ReactNode; onClose: () => void }) {
  return (
    <div className="mb-3 flex items-start justify-between gap-3">
      <h3 className="font-display text-base font-semibold tracking-wide text-amber uppercase">{title}</h3>
      <button
        type="button"
        onClick={onClose}
        className="text-xl leading-none text-text-dim hover:text-amber"
        aria-label="Close"
      >
        &times;
      </button>
    </div>
  )
}
