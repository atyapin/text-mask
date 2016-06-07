import React, {PropTypes} from 'react'
import {
  processComponentChanges,
  safeSetSelection,
  getComponentInitialState
} from '../../core/src/componentHelpers.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },

  getInitialState() {
    return {}
  },

  componentWillMount() {
    const {mask, placeholderCharacter: placeholderChar, value = ''} = this.props

    this.textMaskState = getComponentInitialState({value, mask, placeholderChar})
  },

  componentDidUpdate() {
    safeSetSelection(this.inputElement, this.textMaskState.adjustedCaretPosition)
  },

  render() {
    const {
      props,
      textMaskState: {conformedInput: previousConformedInput, componentPlaceholder},
      state: {value: stateValue},
      props: {
        placeholder = componentPlaceholder,
        type = 'text',
        value,
        mask,
        validator,
        guide,
        placeholderChar
      },
      onChange
    } = this
    const currentCaretPosition = (this.inputElement !== undefined) ?
      this.inputElement.selectionStart :
      0
    const {conformedInput, adjustedCaretPosition} = processComponentChanges({
      userInput: value || stateValue,
      previousConformedInput,
      componentPlaceholder,
      mask,
      validator,
      guide,
      placeholderChar,
      currentCaretPosition
    })

    this.textMaskState.adjustedCaretPosition = adjustedCaretPosition
    this.textMaskState.conformedInput = conformedInput

    if (this.inputElement !== undefined) {
      this.inputElement.value = conformedInput
    }

    return (
      <input
        {...props}
        type={type}
        onChange={onChange}
        value={conformedInput}
        placeholder={placeholder}
        ref={inputElement => (this.inputElement = inputElement)}
      />
    )
  },

  onChange(event) {
    if (this.props.value === undefined || this.props.value === null) {
      this.setState({value: event.target.value})
    }

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event)
    }
  },
})

export default MaskedInput

export {default as conformToMask} from '../../core/src/conformToMask.js'
export {convertMaskToPlaceholder} from '../../core/src/utilities.js'
