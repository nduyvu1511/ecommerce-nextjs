export const Heading = ({
  vniTitle,
  engTitle,
}: {
  vniTitle: string
  engTitle: string
}) => {
  const language = "vni"

  return <h3 className="heading">{language === "vni" ? vniTitle : engTitle}</h3>
}
