import { useState } from 'react'
import classes from './MultiSelector.module.css'
import MultiSelectorProvider, {
  Option,
} from './providers/MultiSelectorProvider'
import SelectedOption from './SelectedOption'
import { useClickOutside } from '../../hooks'
import AvailableOption from './AvailableOption'

type MultiSelectorProps = {
  title: string
  options: Option[]
  onSelect?: (option: Option) => void
  onRemove?: (option: Option) => void
  style?: { [x: string]: string }
  maxSelectNumber?: number
}

export default function MultiSelector({
  title,
  options,
  style,
  onSelect,
  onRemove,
  maxSelectNumber,
}: MultiSelectorProps) {
  const [optionsShowing, setOptionsShowing] = useState(false)
  const refClickOutside = useClickOutside(() => setOptionsShowing(false))
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

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
    <MultiSelectorProvider contextValue={contextValue}>
      {/* TODO: fix this type */}
      {/* @ts-ignore */}
      <div ref={refClickOutside} style={style}>
        <h2>{title}</h2>
        {/* display area */}
        <div
          className={classes.displayArea}
          onClick={(e) => {
            e.stopPropagation() // prevent it triggers useClickOutside, since the element is removed from dom upon click
            setOptionsShowing(true)
          }}
        >
          {selectedOptions.map((selectedOption) => (
            <SelectedOption
              key={selectedOption.label}
              option={selectedOption}
            />
          ))}
        </div>
        {/* options */}
        {optionsShowing && (
          <ul
            className={`${classes.options} ${
              maxSelectNumber && maxSelectNumber <= selectedOptions.length
                ? 'disable'
                : null
            }`}
          >
            {options.map((option) => (
              <AvailableOption key={option.label} option={option} />
            ))}
          </ul>
        )}
      </div>
    </MultiSelectorProvider>
  )
}
