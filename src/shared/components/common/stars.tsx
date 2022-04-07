import { AiFillStar } from "react-icons/ai"

interface IStar {
  count: number
}

export const Stars = ({ count }: IStar) => {
  return (
    <p className="star-wrapper">
      {Array.from({ length: 5 }).map((item, index) =>
        count.toFixed(0) > index.toString() ? (
          <AiFillStar className="star-icon star-icon-fill" key={index} />
        ) : (
          <AiFillStar className="star-icon star-icon-outline" key={index} />
        )
      )}
    </p>
  )
}
