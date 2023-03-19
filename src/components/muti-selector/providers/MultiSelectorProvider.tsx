import { createContext, ReactNode, useContext } from 'react'

export type Option = {
  label: string
  value: string
}

type MultiSelectorContext = {
  selectedOptions: Option[]
  handleSelect: (option: Option) => void
  handleRemove: (option: Option) => void
}

const MultiSelectorContext = createContext<MultiSelectorContext>({
  selectedOptions: [],
  handleSelect: () => {
    throw new Error('handleSelect should be used under provider')
  },
  handleRemove: () => {
    throw new Error('handleRemove should be used under provider')
  },
})

type MultiSelectorProviderProps = {
  children: ReactNode
  contextValue: MultiSelectorContext
}

export default function MultiSelectorProvider({
  children,
  contextValue,
}: MultiSelectorProviderProps) {
  return (
    <MultiSelectorContext.Provider value={contextValue}>
      {children}
    </MultiSelectorContext.Provider>
  )
}

export const useMultiSelectorContext = () => useContext(MultiSelectorContext)
