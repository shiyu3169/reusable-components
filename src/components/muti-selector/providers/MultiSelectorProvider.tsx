import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export type Option = {
  label: string
  value: string
}

const MultiSelectorContext = createContext<{
  selectedOptions: Option[]
  handleSelect: (option: Option) => void
  handleRemove: (option: Option) => void
}>({
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
  onSelect?: (option: Option) => void
  onRemove?: (option: Option) => void
  maxSelectNumber?: number
  selectedOptions: Option[]
  setSelectedOptions: Dispatch<SetStateAction<Option[]>>
}

export default function MultiSelectorProvider({
  children,
  onSelect,
  onRemove,
  maxSelectNumber,
  selectedOptions,
  setSelectedOptions,
}: MultiSelectorProviderProps) {
  const handleSelect = (option: Option) => {
    if (maxSelectNumber && selectedOptions.length >= maxSelectNumber) return
    setSelectedOptions((options) => [...options, option])
    // Allow custom onSelect callback
    if (onSelect) {
      onSelect(option)
    }
  }

  const handleRemove = (option: Option) => {
    setSelectedOptions((options) =>
      options.filter((optionInArr) => optionInArr.label !== option.label),
    )
    // Allow custom onRemove callback
    if (onRemove) {
      onRemove(option)
    }
  }

  const contextValue = {
    selectedOptions,
    handleSelect,
    handleRemove,
  }
  return (
    <MultiSelectorContext.Provider value={contextValue}>
      {children}
    </MultiSelectorContext.Provider>
  )
}

export const useMultiSelectorContext = () => useContext(MultiSelectorContext)
