import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './Multiselector.css'

/* -------------------------------------------------------------------------- */
/*                                MultiSelector                               */
/* -------------------------------------------------------------------------- */
export default function MultiSelector({
  title,
  options,
  style,
  onSelect,
  onRemove,
  maxSelectNumber,
}) {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [optionsShowing, setOptionsShowing] = useState(false)
  const refClickOutside = uesClickOutside(() => setOptionsShowing(false))

  const handleSelect = (option) => {
    if (maxSelectNumber && selectedOptions.length >= maxSelectNumber) return
    setSelectedOptions((options) => [...options, option])
    // Allow customer onSelect callback
    if (onSelect) {
      onSelect(option)
    }
  }

  const handleRemove = (removedOption) => {
    setSelectedOptions((options) =>
      options.filter((option) => option.label !== removedOption.label),
    )
    // Allow customer onRemove callback
    if (onRemove) {
      onRemove(removedOption)
    }
  }
  const contextValue = {
    selectedOptions,
    handleSelect,
    handleRemove,
  }

  return (
    <MultiSelectorContext.Provider value={contextValue}>
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
              selectedOption={selectedOption}
            />
          ))}
        </div>
        {/* options */}
        {optionsShowing && (
          <ul
            className={`options ${
              maxSelectNumber <= selectedOptions.length ? 'disable' : null
            }`}
          >
            {options.map((option) => (
              <Option
                key={option.label}
                option={option}
                selectedOptions={selectedOptions}
              />
            ))}
          </ul>
        )}
      </div>
    </MultiSelectorContext.Provider>
  )
}
/* -------------------------------------------------------------------------- */
/*                               SelectedOption                               */
/* -------------------------------------------------------------------------- */
function SelectedOption({ selectedOption }) {
  const { handleRemove } = useMultiSelectorContext()
  return (
    <div className='selected-option'>
      <span>{selectedOption.label}</span>
      <button
        onClick={() => {
          handleRemove(selectedOption)
        }}
      >
        X
      </button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Option                                   */
/* -------------------------------------------------------------------------- */
function Option({ option }) {
  const { selectedOptions, handleRemove, handleSelect } =
    useMultiSelectorContext()
  const [checked, setChecked] = useState(0)
  useEffect(() => {
    const found = selectedOptions.find(
      (selectedOption) => selectedOption.label === option.label,
    )
    setChecked(found ? 1 : 0)
  }, [selectedOptions])

  const onChange = (e) => {
    const { checked } = e.target
    if (checked) {
      handleSelect(option)
    } else {
      handleRemove(option)
    }
  }

  return (
    <li className='option'>
      <input
        className='checkbox'
        type='checkbox'
        onChange={onChange}
        checked={checked}
      />
      <span>{option.label}</span>
    </li>
  )
}

function uesClickOutside(callback) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current

    if (element == null) {
      return
    }
    const onClick = (e) => {
      if (!element.contains(e.target)) {
        callback()
      }
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [])
  return ref
}
