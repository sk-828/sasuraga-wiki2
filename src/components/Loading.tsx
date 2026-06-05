export function Loading() {
  return (
    <div className="has-text-centered" style={{ padding: "2rem" }} aria-live="polite" aria-busy="true">
      <div className="loader" />
      <p>読み込み中...</p>
    </div>
  );
}
