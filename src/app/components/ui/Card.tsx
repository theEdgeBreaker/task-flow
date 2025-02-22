export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 p-4">
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
