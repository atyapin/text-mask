import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {convertMaskToPlaceholder, isString, isNumber} from './utilities.js'

export function processComponentChanges({
  userInput = '',
  componentPlaceholder = '',
  previousConformedInput = '',
  mask = '',
  guide = '',
  validator,
  currentCaretPosition = 0,
  placeholderChar
}) {
  const conformToMaskResults = conformToMask(
    userInput,
    mask,
    {previousConformedInput, guide, placeholderChar, validator}
  )
  const {output: outputOfConformToMask} = conformToMaskResults
  const adjustedCaretPosition = adjustCaretPosition({
    previousConformedInput,
    conformToMaskResults,
    currentCaretPosition,
    placeholderChar
  })
  const valueShouldBeEmpty = adjustedCaretPosition === 0 && (
    userInput === '' ||
    outputOfConformToMask === componentPlaceholder
  )
  const conformedInput = (valueShouldBeEmpty) ? '' : outputOfConformToMask

  return {conformedInput, adjustedCaretPosition}
}

export function getComponentInitialState({inputValue, mask, placeholderChar}) {
  checkInputValueType(inputValue)

  return {
    conformedInput: '',
    adjustedCaretPosition: 0,
    componentPlaceholder: convertMaskToPlaceholder({mask, placeholderChar})
  }
}

export function safeSetSelection(element, selectionPosition) {
  if (document.activeElement === element) {
    element.setSelectionRange(selectionPosition, selectionPosition, 'none')
  }
}

function checkInputValueType(inputValue) {
  if (isString(inputValue)) {
    return inputValue
  } else if (isNumber(inputValue)) {
    return String(inputValue)
  } else if (inputValue === undefined || inputValue === null) {
    return ''
  } else {
    console.log('Text Mask received', inputValue) // eslint-disable-line
    throw new Error('The `value` provided to Text Mask needs to be a string or a number.')
  }
}
