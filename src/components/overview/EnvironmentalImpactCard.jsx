import { motion } from "framer-motion"
import { TreePine, Weight} from "lucide-react"

const environmentalImpactCard = ({environmentalImpact}) => {
    return (
        <div className="bg-white p-4 flex h-full flex-col rounded-lg shadow">
            <h2 className="text-xl font-light tracking-wide mb-4 lg:mb-6 text-center">
                Our Environmental Impact
            </h2>
 
                <div className="flex flex-col h-full w-full space-y-4 lg:space-y-6 text-l xl:text-xl tracking-wider">
                    {/*Renewable section*/}   
                    <div className="flex-1 flex flex-col items-center justify-center px-2">
                        <div className="flex items-center mb-2 xl:mb-3 text-sm xl:text-lg">
                            <span className="font-medium text-green-500 mr-1">
                                {environmentalImpact.renewablePercentage}% 
                            </span>
                            <span className="font-medium">
                                Renewable Energy
                            </span>
                        </div>
                    <div className="w-4/5 max-w-xs bg-gray-200 rounded-md h-10 xl:h-15 items-center justify-center">
                        <motion.div 
                            className="bg-green-500 h-10 xl:h-15 rounded-md" 
                            initial={{width: 0}}
                            animate={{ width: `${environmentalImpact.renewablePercentage}%` }}
                            transition={{ duration: 1, ease: "easeOut"}}
                            aria-valuenow={environmentalImpact.renewablePercentage}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        />
                    </div>
                </div>

            {/*C02 section*/}
            <div className="flex-1 flex flex-col items-center justify-center font-light px-2">
                <div className="flex items-center justify-center mb-4" >
                    <Weight 
                        color='#57534e'
                        className="
                            h-6 w-6 
                            sm:h-9 sm:w-9 
                            md:h-11 md:w-11
                            lg:h-13 lg:w-13
                            xl:h-14 xl:w-14
                            transition-all duration-200
                        " />
                </div>
              <span className='text-center text-sm xl:text-lg mb-1 xl:mb-2'>
                <span className='font-semibold'>
                    {environmentalImpact.co2Saved} 
                    </span> kgs of CO₂ saved this year
              </span>
              
            </div>

            {/*Tree equivalent section*/}
            <div className="flex-1 flex flex-col items-center justify-center font-light px-2 mb-2">
                <div className="flex items-center justify-center mb-4" >
                    <TreePine 
                        color='#22c55e'
                        className="
                        h-6 w-6 
                        sm:h-9 sm:w-9 
                        md:h-11 md:w-11
                        lg:h-13 lg:w-13
                        xl:h-14 xl:w-14
                        transition-all duration-200
                    " />
                </div>
                <span className='text-center text-sm xl:text-lg mb-1 xl:mb-2'>
                    Equivalent to planting <span className='font-semibold'>
                        {environmentalImpact.treeEquivalents}
                    </span> trees
                </span>
                
            </div>
          </div>
        </div>
    )
}

export default environmentalImpactCard