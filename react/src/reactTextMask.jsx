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
    const {
      value: inputValue,
      mask,
      guide,
      placeholderCharacter: placeholderChar,
      validator
    } = this.props

    return getComponentInitialState({inputValue, mask, validator, guide, placeholderChar})
  },

  componentDidUpdate() {
    safeSetSelection(this.inputElement, this.adjustedCaretPosition)
  },

  render() {
    const {props, onChange, state: {componentPlaceholder, value: stateValue}, conformedInput: previousConformedInput} = this
    const {
      placeholder = componentPlaceholder,
      type = 'text',
      value = '',
      mask,
      validator,
      guide,
      placeholderCharacter: placeholderChar
    } = props
    const {conformedInput, adjustedCaretPosition} = processComponentChanges({
      userInput: value || stateValue,
      placeholder: componentPlaceholder,
      previousConformedInput,
      mask,
      validator,
      guide,
      placeholderChar,
      currentCaretPosition: (this.inputElement !== undefined) ? this.inputElement.selectionStart : 0
    })

    this.adjustedCaretPosition = adjustedCaretPosition
    this.conformedInput = conformedInput

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
    // const {target: {value: userInput}} = event
    // const {
    //   props: {mask, guide, placeholderCharacter: placeholderChar, validator},
    //   state: {componentPlaceholder: placeholder},
    //   conformedInput: previousConformedInput
    // } = this
    //
    // const {conformedInput, adjustedCaretPosition} = processComponentChanges({
    //   userInput,
    //   placeholder,
    //   previousConformedInput,
    //   mask,
    //   validator,
    //   guide,
    //   placeholderChar,
    //   currentCaretPosition: this.inputElement.selectionStart
    // })
    //
    // this.conformedInput = conformedInput
    // this.adjustedCaretPosition = adjustedCaretPosition
    //
    // // this.setState({conformedInput, adjustedCaretPosition})
    //
    // console.log('conformedInput', conformedInput)
    //
    // event.target.value = conformedInput
    //

    if (typeof this.props.value !== 'string') {
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
