import React, {PropTypes} from 'react'
import {
  processComponentChanges,
  safeSetSelection,
  getSafeInputValueType
} from '../../core/src/reactComponentHelpers.js'

export const MaskedInput = React.createClass({
  propTypes: {
    mask: PropTypes.string.isRequired,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },

  resetTextMaskState() {
    this.textMaskState = {adjustedCaretPosition: 0, conformedInput: ''}
  },

  resetState() {
    this.resetTextMaskState()
    this.setState({value: ''})
  },

  getInitialState() {
    this.resetTextMaskState()

    return {value: ''}
  },

  componentDidUpdate() {
    safeSetSelection(this.inputElement, this.textMaskState.adjustedCaretPosition)
  },

  render() {
    const {
      props, onChange, inputElement,
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
      }
    } = this
    const currentCaretPosition = (inputElement !== undefined) ? inputElement.selectionStart : 0
    const {conformedInput, adjustedCaretPosition} = processComponentChanges({
      userInput: (value !== undefined) ? getSafeInputValueType(value) : stateValue,
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

    if (inputElement !== undefined) {
      inputElement.value = conformedInput
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
    if (this.props.value === undefined) {
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
