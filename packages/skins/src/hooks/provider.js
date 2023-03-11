import { createContext, useMemo } from 'react'

const XircusSkin = createContext()

export default XircusSkinProvider = ({ router, skin,  }) => {
  const ctx = useMemo(() => {

  }, [])

  return (
    <XircusSkin.Provider value={ctx}>
      <Component  />
    </XircusSkin.Provider>
  )
}