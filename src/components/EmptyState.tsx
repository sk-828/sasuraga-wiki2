interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "表示するデータがありません。" }: EmptyStateProps) {
  return (
    <div className="notification is-light has-text-centered">
      <p>{message}</p>
    </div>
  );
}
