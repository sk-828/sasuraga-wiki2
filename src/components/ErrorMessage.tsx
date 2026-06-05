interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="notification is-danger" role="alert">
      <p>{message || "データの取得に失敗しました。"}</p>
      {onRetry && (
        <button type="button" className="button is-small is-light mt-2" onClick={onRetry}>
          再読み込み
        </button>
      )}
    </div>
  );
}
