export const truncateText = (
  text: string,
  startingChar: number = 0,
  maxCharLength: number = 80,
  truncateOnRight = true,
  truncatedPartPlaceholder = '...'
) => {
  let placeholder = ''
  if (text.length > maxCharLength) {
    placeholder = truncatedPartPlaceholder
    return truncateOnRight
      ? `${text.substring(
          startingChar,
          startingChar + maxCharLength
        )}${placeholder}`
      : `${placeholder}${text.substring(
          text.length - maxCharLength + startingChar,
          text.length
        )}`
  }

  if (startingChar > 0) {
    return text.substring(startingChar, startingChar + maxCharLength)
  }

  return text
}
