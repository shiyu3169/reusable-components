import { createContext, useContext } from 'react'

const MultiSelectorContext = createContext({
  selectedOptions: [],
  handleSelect: () => {
    throw new Error('handleSelect should be used under provider')
  },
  handleRemove: () => {
    throw new Error('handleRemove should be used under provider')
  },
})

export const useMultiSelectorContext = () => useContext(MultiSelectorContext)
