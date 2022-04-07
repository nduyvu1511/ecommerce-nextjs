interface CategoryListProps {
  length: number
}

export const CategoryListLoading = ({ length }: CategoryListProps) => {
  return (
    <div className="category__list__loading">
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="category__list__loading-item">
          <div className="category__list__loading-item-img"></div>
          <div className="category__list__loading-item-name"></div>
        </div>
      ))}
    </div>
  )
}
