export function setButtonText(
  btn,
  isLoading,
  defaultText = "Save",
  loadingText = "Saving..."
) {
  if (isLoading) {
    btn.textContent = loadingText;
  } else {
    btn.textContent = defaultText;
  }
}

export function getInputValues(inputList) {
  const values = {};
  inputList.forEach((input) => {
    values[input.name] = input.value;
  });
  return values;
}
