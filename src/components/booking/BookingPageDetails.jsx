import useParams from "react-router-dom"

const BookingPageDetails = () => {
  const { id } = useParams()

  return (
    <>
    <div>BookingPageDetails: {id}</div>
    </>
  )
}

export default BookingPageDetails