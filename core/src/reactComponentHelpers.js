/*
I created this file just so I can publish these changes without impacting the other
components.

TODO: update other components and original `componentHelpers.js` file to use the code below.
 */
import adjustCaretPosition from './adjustCaretPosition.js'
import conformToMask from './conformToMask.js'
import {isString, isNumber} from './utilities.js'

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
  if (userInput === '') {
    return {conformedInput: '', adjustedCaretPosition: 0}
  } else {
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

    const valueShouldBeEmpty = (
      adjustedCaretPosition === 0 &&
      outputOfConformToMask === componentPlaceholder
    )
    const conformedInput = (valueShouldBeEmpty) ? '' : outputOfConformToMask

    return {conformedInput, adjustedCaretPosition}
  }
}

export function safeSetSelection(element, selectionPosition) {
  if (document.activeElement === element) {
    element.setSelectionRange(selectionPosition, selectionPosition, 'none')
  }
}

export function getSafeInputValueType(inputValue) {
  if (isString(inputValue)) {
    return inputValue
  } else if (isNumber(inputValue)) {
    return String(inputValue)
  } else {
    throw new Error(
      `Text Mask received '${JSON.stringify(inputValue)}' as a value. Please set value to ` +
      'either a string or a number.'
    )
  }
}
