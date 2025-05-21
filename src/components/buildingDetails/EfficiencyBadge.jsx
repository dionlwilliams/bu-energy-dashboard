import { getEfficiencyRating } from "../../utils/energyRatings"

const EfficiencyBadge = ({ kWh, COLOUR_SCALE }) => {
  const rating = getEfficiencyRating(kWh)
  const [r, g, b] = COLOUR_SCALE[rating.colorIndex]
  
  return (
    <span 
      className='flex items-center justify-center w-10 h-10 rounded-full text-white text-base font-semibold'
      style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
    >
      {rating.grade}
    </span>
  )
}

export default EfficiencyBadge