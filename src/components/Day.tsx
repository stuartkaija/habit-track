export default function Day({ date, completionStatus, onUpdate }: any) {

  const handleMarkComplete = async () => {
    onUpdate(date, !completionStatus);
  }

  return (
    <div
      className={`h-4 w-4 m-px border border-black rounded-sm cursor-pointer ${completionStatus ? 'bg-green-300' : 'bg-white'}`}
      onClick={handleMarkComplete}
    ></div>
  )
}
