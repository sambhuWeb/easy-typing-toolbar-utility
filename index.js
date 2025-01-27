'use strict';

module.exports = class ToolbarUtility {
    constructor(wordProcessor) {
        if (typeof wordProcessor === 'undefined') {
            throw 'WordProcessor Class Missing';
        }

        this.wordProcessor = wordProcessor;
    }

    /**
     * On clicking source element, focus the element
     * @param sourceEventElementId
     * @param editableElementId
     * @param eventType
     */
    focusElementOnEventType(
        sourceEventElementId,
        focusableElementId,
        eventType = 'click'
    ) {
        const sourceEventElement = document.getElementById(sourceEventElementId);

        if (sourceEventElement !== null) {
            sourceEventElement.addEventListener(eventType, function (event) {
                const focusableElement = document.getElementById(focusableElementId);

                if (focusableElement !== null) {
                    focusableElement.focus();
                }
            });
        }
    }

    /**
     * Reset Element Values on Event Type.
     *
     * @param sourceEventElementId
     * @param resettableElementIds
     * @param hideableElementIds
     * @param eventType
     */
    resetElementsValuesOnEventType(
        sourceEventElementId,
        resettableElementIds = [],
        hideableElementIds = [],
        callbackFunction,
        eventType = 'click'
    ) {
        const sourceEventElement = document.getElementById(sourceEventElementId);

        if (sourceEventElement !== null) {
            sourceEventElement.addEventListener(eventType, function (event) {
                if (resettableElementIds.length > 0) {
                    resettableElementIds.forEach(function (resettableElementId) {
                        const resettableElement = document.getElementById(resettableElementId);

                        if (resettableElement !== null) {
                            resettableElement.value = '';
                            resettableElement.focus();
                        }
                    });
                }

                if (hideableElementIds.length > 0) {
                    hideableElementIds.forEach(function (hideableElementId) {
                        const hideableElement = document.getElementById(hideableElementId);
                        if (hideableElement !== null) {
                            hideableElement.style.display = 'none';
                        }
                    })
                }

                callbackFunction();
            });
        }
    }

    /**
     *
     * @param sourceEventElementId Element on with eventType (keyup, click) to listen to
     * @param sourceInputElementId This can be same as sourceEventElementId (if textarea on keyup) or different
     * @param targetElementIdToUpdateCharacter
     * @param parentOfTargetElement
     * @param eventType
     */
    calculateTotalCharacterOnEventType(
        sourceEventElementId,
        sourceInputElementId,
        targetElementIdToUpdateCharacter,
        parentOfTargetElement = null,
        eventType = 'keyup'
    ) {
        const sourceEventElement = document.getElementById(sourceEventElementId);
        const thisClass = this;

        if (sourceEventElement !== null) {
            sourceEventElement.addEventListener(eventType, function (event) {
                let textBlock = '';

                if (sourceEventElementId !== sourceInputElementId) {
                    const sourceInputElement = document.getElementById(sourceInputElementId);

                    if (typeof sourceInputElement === 'undefined') {
                        throw 'Source Input Element ID name could not be found';
                    }

                    textBlock = sourceInputElement.value;
                } else {
                    textBlock = this.value;
                }

                thisClass.countAndUpdateTotalCharactersOnElement(
                    textBlock,
                    targetElementIdToUpdateCharacter,
                    parentOfTargetElement
                );
            });
        }
    }

    /**
     *
     * @param sourceEventElementId Element on with eventType (keyup, click) to listen to
     * @param sourceInputElementId This can be same as sourceEventElementId (if textarea on keyup) or different
     * @param targetElementIdToUpdateCharacter
     * @param maximumCharacterAllowedElementId
     * @param parentOfTargetElement
     * @param eventType
     */
    calculateRemainingCharacterOnEventType(
        sourceEventElementId, // Element on with eventType (keyup, click) to listen to
        sourceInputElementId,
        targetElementIdToUpdateCharacter,
        maximumCharacterAllowedElementId,
        parentOfTargetElement = null,
        eventType = 'keyup'
    ) {
        const sourceEventElement = document.getElementById(sourceEventElementId);
        const thisClass = this;

        if (sourceEventElement !== null) {
            sourceEventElement.addEventListener(eventType, function (event) {
                let textBlock = '';

                if (sourceEventElementId !== sourceInputElementId) {
                    const sourceInputElement = document.getElementById(sourceInputElementId);

                    if (typeof sourceInputElement === 'undefined') {
                        throw 'Source Input Element ID name could not be found';
                    }

                    textBlock = sourceInputElement.value;
                } else {
                    textBlock = this.value;
                }

                thisClass.countAndUpdateRemainingCharactersOnElement(
                    textBlock,
                    targetElementIdToUpdateCharacter,
                    maximumCharacterAllowedElementId,
                    parentOfTargetElement
                );
            });
        }
    }

    /**
     *
     * @param sourceEventElementId Element on with eventType (keyup, click) to listen to
     * @param sourceInputElementId This can be same as sourceEventElementId (if textarea on keyup) or different
     * @param targetElementIdToUpdate
     * @param parentOfTargetElement
     * @param eventType
     */
    calculateWordCountOnEventType(
        sourceEventElementId,
        sourceInputElementId,
        targetElementIdToUpdate,
        parentOfTargetElement = null,
        eventType = 'keyup'
    ) {
        const sourceEventElement = document.getElementById(sourceEventElementId);
        const thisClass = this;

        if (sourceEventElement !== null) {
            sourceEventElement.addEventListener(eventType, function (event) {
                let textBlock = '';

                if (sourceEventElementId !== sourceInputElementId) {
                    const sourceInputElement = document.getElementById(sourceInputElementId);

                    if (typeof sourceInputElement === 'undefined') {
                        throw 'Source Input Element ID name could not be found';
                    }

                    textBlock = sourceInputElement.value;
                } else {
                    textBlock = this.value;
                }

                thisClass.calculateAndUpdateWordCountOnElement(
                    textBlock,
                    targetElementIdToUpdate,
                    parentOfTargetElement
                );
            });
        }
    }

    calculateAndUpdateWordCountOnElement(textBlock, targetElementIdToUpdate, parentOfTargetElement) {
        const targetElementToUpdate = document.getElementById(targetElementIdToUpdate);

        const totalWords = this.wordProcessor
            .countWord(textBlock)
            .toString()
        ;

        if (parentOfTargetElement !== null) {
            const parentElement = document.getElementById(parentOfTargetElement);

            if (totalWords > 0) {
                parentElement.style.display = 'block';
            } else {
                parentElement.style.display = 'none';
            }
        }

        targetElementToUpdate.innerText = totalWords;
    }

    countAndUpdateRemainingCharactersOnElement(
        textBlock,
        targetElementIdToUpdateCharacter,
        maximumCharacterAllowedElementId,
        parentOfTargetElement
    ) {
        const totalCharacter = this.wordProcessor.countCharacter(textBlock);
        const targetElementToUpdateCharacter = document.getElementById(targetElementIdToUpdateCharacter);
        const maxCharacterAllowed = document.getElementById(maximumCharacterAllowedElementId);
        let maxCharacter = 500;

        if (maxCharacterAllowed !== null) {
            const maxCharacterAllowedValue = maxCharacterAllowed.textContent.trim();

            if (maxCharacterAllowedValue !== '' && /^[0-9]+$/.test(maxCharacterAllowedValue)) {
                maxCharacter = parseInt(maxCharacterAllowedValue)
            }
        }

        if (parentOfTargetElement !== null) {
            const parentElement = document.getElementById(parentOfTargetElement);

            if (totalCharacter > 0) {
                parentElement.style.display = 'block';
            } else {
                parentElement.style.display = 'none';
            }
        }

        targetElementToUpdateCharacter.innerText = (maxCharacter - totalCharacter).toString();
    }

    countAndUpdateTotalCharactersOnElement(
        textBlock,
        targetElementIdToUpdateCharacter,
        parentOfTargetElement
    ) {
        const totalCharacter = this.wordProcessor.countCharacter(textBlock);

        const targetElementToUpdateCharacter = document.getElementById(targetElementIdToUpdateCharacter);

        if (parentOfTargetElement !== null) {
            const parentElement = document.getElementById(parentOfTargetElement);

            if (totalCharacter > 0) {
                parentElement.style.display = 'block';
            } else {
                parentElement.style.display = 'none';
            }
        }

        targetElementToUpdateCharacter.innerText = (totalCharacter).toString();
    }
};
