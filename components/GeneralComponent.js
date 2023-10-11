export function FormLabel(props) {
  return (
    <label className="mb-0 block text-sm font-normal">{props.label}</label>
  );
}

export function FormErrorMessage(props) {
  return (
    props.errors[props.name] && (
      <small className="p-error">{props.errors[props.name].message}</small>
    )
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
}
