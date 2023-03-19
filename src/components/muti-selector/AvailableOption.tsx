import { useEffect, useState } from 'react'
import {
  Option,
  useMultiSelectorContext,
} from './providers/MultiSelectorProvider'

type OptionProps = {
  option: Option
}

export default function AvailableOption({ option }: OptionProps) {
  const { selectedOptions, handleRemove, handleSelect } =
    useMultiSelectorContext()
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    const found = selectedOptions.find(
      (selectedOption) => selectedOption.label === option.label,
    )
    setChecked(!!found)
  }, [selectedOptions])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
