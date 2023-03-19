import { useEffect, useRef, useState } from 'react'
import './Multiselector.css'
import MultiSelectorProvider, {
  Option,
} from './providers/MultiSelectorProvider'
import SelectedOption from './SelectedOption'
import { useClickOutside } from '../../hooks'
import AvailableOption from './Option'

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
  return (
    <MultiSelectorProvider
      onRemove={onRemove}
      onSelect={onSelect}
      maxSelectNumber={maxSelectNumber}
      selectedOptions={selectedOptions}
      setSelectedOptions={setSelectedOptions}
    >
      {/* TODO: fix this type */}
      {/* @ts-ignore */}
      <div ref={refClickOutside} style={style}>
        <h2>{title}</h2>
        {/* display area */}
        <div
          className='display-area'
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
            className={`options ${
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
