import { Fragment } from 'react'
import { Slide, toast } from 'react-toastify'

type ToastProps = {
  header: string | null
  message: string | null
}

const ErrorToast = ({ message, header }: ToastProps) => {
  return (
    <Fragment>
      <div className="toastify-header">
        <div className="title-wrapper">
          {header && <h6 className="toast-title"> {header} </h6>}
        </div>
        <small>Now</small>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          {message}
        </span>
      </div>
    </Fragment>
  )
}

const SuccessToast = ({ message, header }: ToastProps) => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        {header && <h6 className="toast-title">{header}</h6>}
      </div>
      <small className="text-muted">Now</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        👋 {message}
      </span>
    </div>
  </Fragment>
)
export const notifyError = ({ header, message }: ToastProps) =>
  toast.error(<ErrorToast message={message} header={header} />, {
    transition: Slide,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
  })
export const notifySuccess = ({ header, message }: ToastProps) =>
  toast.error(<SuccessToast message={message} header={header} />, {
    transition: Slide,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
  })
