import React from 'react'

const RightBar = () => {
  return (
    <div className=' max-sm:hidden  max-w-2xl  h-screen flex-col flex p-6'>
        <div className="flex-1">
            <h1 className="text-2xl max-lg:text-xl font-semibold"> Suggested Communities</h1>
        </div>

        <div className="flex-1">
            <h1 className="text-2xl max-lg:text-xl max-sm">Suuggested Users</h1>
        </div>
        
    </div>
  )
}

export default RightBar