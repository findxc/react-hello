import { createContext, useContext } from 'react'

const GlobalContext = createContext()

const GlobalDataConfig = GlobalContext.Provider

const useGlobalData = () => {
  const data = useContext(GlobalContext)
  return data
}

export { GlobalDataConfig }

export default useGlobalData
