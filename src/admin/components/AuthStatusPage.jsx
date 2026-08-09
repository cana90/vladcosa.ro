export default function AuthStatusPage({ status, onRetry }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50 px-6 text-center text-slate-700">
      {status === 'checking' ? (
        <p role="status">Se verifică sesiunea…</p>
      ) : (
        <div className="max-w-md rounded-2xl border border-sage-100 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-light text-slate-900">
            Sesiunea nu poate fi verificată
          </h1>
          <p className="mt-4 text-slate-600">
            Verifică conexiunea și încearcă din nou.
          </p>
          <button
            type="button"
            className="btn-secondary mt-6"
            onClick={onRetry}
          >
            Încearcă din nou
          </button>
        </div>
      )}
    </div>
  )
}
