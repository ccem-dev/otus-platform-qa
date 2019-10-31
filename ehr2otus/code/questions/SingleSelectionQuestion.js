const EhrQuestion = require('./EhrQuestion');
const choiceGroups = require('../globalVars').choiceGroups;

class SingleSelectionQuestion extends EhrQuestion {

    constructor(ehrQuestionObj, pageId){
        super(ehrQuestionObj, pageId);
        this.choiceGroupId = ehrQuestionObj.choiceGroupId;
    }

    replaceHiddenQuestionAnswerValue(){
        this.hiddenQuestionIsVisibleWhenMyAnswerIs = choiceGroups.findChoiceLabelInSpecificChoiceGroup(
            this.choiceGroupId, 
            this.hiddenQuestionIsVisibleWhenMyAnswerIs);
    }
    
    toOtusStudioObj(){
        let questionObj = this.getOtusStudioQuestionHeader( "SingleSelectionQuestion", "Integer");
        const choiceGroupObjArr = choiceGroups.choiceObj[this.choiceGroupId];
        let options = [];
        for(let choiceObj of choiceGroupObjArr){
            let numericValue = choiceObj["value"];
            let label = choiceObj["label"];
            options.push({
                "extents": "StudioObject",
                "objectType": "AnswerOption",
                "value": numericValue,
                "extractionValue": numericValue,
                "dataType": "Integer",
                "label":  EhrQuestion.getLabelObj(label)
            });
        }
        questionObj["options"] = options;
        return questionObj;
    }
}

module.exports = SingleSelectionQuestion;