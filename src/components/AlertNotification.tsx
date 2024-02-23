
const alertTypes = {
  success: {
    icon: null,
    iconClass: 'text-green-600'
  },
  error: {
    icon: null,
    iconClass: 'text-red-600'
  }
}

export default function AlertNotification({
  message,
  type,
  id
}: {
  message: string,
  type: string,
  id: number
}) {
  console.log('ALERT NOTIFICATION')
  const { icon, iconClass } = alertTypes[type]
  console.log(icon, iconClass)
  return (
    <div role="alert" className="rounded-xl border border-slate-300 bg-white p-4">
      <div className="flex items-start gap-4">
        <span className={iconClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        <div className="flex-1">
          {/* <strong className="block font-medium text-slate-900"> Changes saved </strong> */}

          <p className="mt-1 font-medium text-slate-700">{message}</p>
        </div>

        <button className="text-gray-500 transition hover:text-gray-600">
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
