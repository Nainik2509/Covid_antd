import { Spinner } from 'reactstrap'

export const FallBackSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner color="primary"></Spinner>
    </div>
  )
}
