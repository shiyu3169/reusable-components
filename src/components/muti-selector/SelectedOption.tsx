import {
  Option,
  useMultiSelectorContext,
} from './providers/MultiSelectorProvider'
import classes from './MultiSelector.module.css'

type SelectedOptionProps = {
  option: Option
}

export default function SelectedOption({ option }: SelectedOptionProps) {
  const { handleRemove } = useMultiSelectorContext()
  return (
    <div className={classes.selectedOption}>
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
