import { motion } from "framer-motion"
import { TreePine, Weight} from "lucide-react"

const environmentalImpactCard = ({environmentalImpact}) => {
    return (
        <div className="bg-white p-4 flex h-full flex-col rounded-lg shadow">
        <h2 className="text-xl font-light tracking-wide mb-4 text-center">Our Environmental Impact</h2>
          <div className="flex flex-col h-full w-full space-y-3 text-l tracking-wider">
            <div className="h-1/4 w-3/4 mx-auto flex items-center flex-col">
              <div className="flex justify-center mb-2">
                <span className="font-medium text-green-500 mr-1">
                {environmentalImpact.renewablePercentage}% 
                </span>
                <span className="font-medium">
                Renewable Energy
                </span>
              </div>
              <div className="w-3/4 bg-gray-200 rounded-md h-10 items-center justify-center">
                <motion.div 
                className="bg-green-500 h-10 rounded-md" 
                initial={{width: 0}}
                animate={{ width: `${environmentalImpact.renewablePercentage}%` }}
                transition={{ duration: 1, ease: "easeOut"}}
                aria-valuenow={environmentalImpact.renewablePercentage}
                aria-valuemin="0"
                aria-valuemax="100"
                />
              </div>
            </div>
            <div className="h-1/3 w-3/4 mx-auto flex flex-col items-center justify-center font-light">
              <span className='m-2 mb-1'>
                <span className='font-semibold'>{environmentalImpact.co2Saved} </span> kgs of CO₂ saved this year
              </span>
              <span >
                <Weight size={35} color='#292524'/>
              </span>
            </div>
            <div className="h-1/4 w-3/4 mx-auto flex flex-col items-center justify-center font-light">
            <span className='m-2 mb-1'>
            Equivalent to planting <span className='font-semibold'>{environmentalImpact.treeEquivalents}</span> trees
            </span>
            <span>
              <TreePine size={35} color='#292524'/>
            </span>
            </div>
          </div>
        </div>
    )
}

export default environmentalImpactCard