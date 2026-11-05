"use client";
import Modal from "./Modal";

type Props = { open: boolean; title: string; message: string; confirmLabel: string; busy?: boolean; onConfirm: () => void; onClose: () => void };

export default function ConfirmModal({ open, title, message, confirmLabel, busy, onConfirm, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-muted">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button className="btn btn-ghost" onClick={onClose} disabled={busy}>Keep it</button>
        <button className="btn btn-danger" onClick={onConfirm} disabled={busy}>{busy ? "Working..." : confirmLabel}</button>
      </div>
    </Modal>
  );
}