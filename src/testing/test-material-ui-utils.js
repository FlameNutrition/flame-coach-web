/**
 * Extract the <Input /> html element from material ui <TextField />
 * 
 * @param {HTMLElement} element <TextField /> extracted from component
 * @returns <Input /> element inside <TextField />
 */
export const extractInputFromTextField = (element) => {
  return element.firstElementChild.firstChild;
};

/**
 * Extract the <Input /> html element from material ui <TextField />
 * 
 * @param {HTMLElement} element <TextField /> extracted from component
 * @returns <Input /> element inside <TextField />
 */
 export const extractSelectFromTextField = (element) => {
  return element.firstElementChild.childNodes.item(1);
};
