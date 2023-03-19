import {
  Option,
  useMultiSelectorContext,
} from './providers/MultiSelectorProvider'

type SelectedOptionProps = {
  option: Option
}

export default function SelectedOption({ option }: SelectedOptionProps) {
  const { handleRemove } = useMultiSelectorContext()
  return (
    <div className='selected-option'>
      <span>{option.label}</span>
      <button
        onClick={() => {
          handleRemove(option)
        }}
      >
        X
      </button>
    </div>
  )
}
