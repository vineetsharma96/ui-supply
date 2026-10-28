import React, { useRef, useState, useId } from "react";
import "./components.css";
export default function ShareSheet({
  url = "https://example.com/story",
  title = "Something worth sharing",
}) {
  const dialog = useRef();
  const id = useId();
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch {
      setStatus("Select and copy the link below");
    }
  }
  return (
    <div className="ff-demo ff-share">
      <div className="ff-share-symbol">↗</div>
      <h3>Good finds deserve company.</h3>
      <button className="ff-primary" onClick={() => dialog.current.showModal()}>
        Share something good <span>↗</span>
      </button>
      <dialog
        ref={dialog}
        className="ff-share-dialog"
        aria-labelledby={id}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <button
          className="ff-dialog-close"
          aria-label="Close share dialog"
          onClick={() => dialog.current.close()}
        >
          ×
        </button>
        <span className="ff-kicker">PASS IT ON</span>
        <h2 id={id}>{title}</h2>
        <p>Send a little inspiration their way.</p>
        <div className="ff-share-channels">
          <a
            href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
          >
            ✉<span>Email</span>
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
            target="_blank"
            rel="noreferrer"
          >
            ↗<span>WhatsApp</span>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noreferrer"
          >
            𝕏<span>Post</span>
          </a>
        </div>
        <div className="ff-share-link">
          <input
            aria-label="Link to share"
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
          />
          <button onClick={copy}>Copy link</button>
        </div>
        <p aria-live="polite">{status}</p>
      </dialog>
    </div>
  );
}
