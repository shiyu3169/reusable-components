import MultiSelector from './components/muti-selector/MultiSelector'
import Popover from './components/popover/Popover'

const options = [
  { value: 'Joy Smith', label: 'Joy Smith' },
  { value: 'James Beardman', label: 'James Beardman' },
  { value: 'Suzanne Brecker', label: 'Suzanne Brecker' },
  { value: 'Frederick Dhurst', label: 'Frederick Dhurst' },
]

function App() {
  return (
    <div>
      {/* Popover */}
      <Popover>
        <Popover.Trigger>
          <button>show popover</button>
        </Popover.Trigger>
        <Popover.Content>
          <input type='text' />
          <Popover.Close>
            <button>close</button>
          </Popover.Close>
        </Popover.Content>
      </Popover>
      <Popover>
        <Popover.Trigger>
          <button>show popover</button>
        </Popover.Trigger>
        <Popover.Content>
          <input type='text' />
          <Popover.Close>
            <button>close</button>
          </Popover.Close>
        </Popover.Content>
      </Popover>
      {/* Multi Selector */}
      <MultiSelector
        options={options}
        title='Provider'
        maxSelectNumber={3}
        style={{
          width: '400px',
        }}
      />
    </div>
  )
}

export default App
