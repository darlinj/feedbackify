import {
  getQuestions,
  removeQuestion,
  addQuestion,
  addQuestionnaire,
  getQuestionnaires,
  removeQuestionnaire
} from "../../src/apiCalls";
//import Auth from '../../src/authentication'
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "../../src/aws-exports.js";
Amplify.configure(awsConfig);

Cypress.Commands.add("login", () => {
  return Auth.signIn("pinky@example.com", "Passw0rd!")
    .then(user => {
      let session = Auth.currentSession();
    })
    .catch(err => console.log("===> err", err));
});

Cypress.Commands.add("deleteAllQuestions", () => {
  console.log("something");
  return getQuestions().then(questions => {
    console.log(questions);
    questions.forEach(question => {
      removeQuestion(question.id);
    });
  });
});

Cypress.Commands.add("deleteAllQuestionnaires", () => {
  return getQuestionnaires().then(questionnaires => {
    questionnaires.forEach(questionnaire => {
      removeQuestionnaire(questionnaire.id);
    });
  });
});

Cypress.Commands.add("addQuestion", question => {
  console.log(question);
  return addQuestion(question)
    .then(result => {
      return result;
    })
    .catch(e => {
      console.log("Failed to add question", e);
    });
});

Cypress.Commands.add("addQuestionnaire", newRequest => {
  const request = {
    userid: 1234,
    name: newRequest
  };
  return addQuestionnaire(request)
    .then(result => {
      return result;
    })
    .catch(e => {
      console.log(e);
    });
});

const createQuestion = (questionnaireId, question) => {
  const request = {
    questionnaireid: questionnaireId,
    question: question
  };
  return addQuestion(request).then(result => {
    return result;
  });
};

const addQuestions = feedbackData => {
  let promises = [];
  feedbackData.questions.forEach(question => {
    promises.push(
      createQuestion(feedbackData.questionnaireId, question.question)
    );
  });
  Promise.all(promises).then(addedQuestions => {
    addedQuestions.forEach((question, index) => {
      feedbackData.questions[index].id = question.id;
    });
    createFeedbacks(feedbackData);
  });
  return feedbackData;
};

const createFeedbacks = feedbackdata => {
  console.log("START HERE: create the feedback");
};

Cypress.Commands.add("createFeedback", feedbackData => {
  const request = {
    userid: 1234,
    name: feedbackData.questionnaireName
  };
  return addQuestionnaire(request)
    .then(addedQuestionnaire => {
      feedbackData.questionnaireId = addedQuestionnaire.id;
      return feedbackData;
    })
    .then(addQuestions)
    .catch(e => {
      console.log(e);
    });
});
//Cypress.Commands.add("createFeedback", feedbackData => {
//  return cy
//    .addQuestionnaire(feedbackData.questionnaireName)
//    .then(addedQuestionnaire => {
//      feedbackData.questionnaireId = addedQuestionnaire.id;
//      return feedbackData;
//    })
//    .then(feedbackData => {
//      console.log("feedbackData", feedbackData);
//      cy.wrap(feedbackData.questions).each((question, i, array) => {
//        question.questionnaireid = feedbackData.questionnaireId;
//        cy.addQuestion(question).then(addedQuestion => {
//          console.log("added question", addedQuestion);
//          feedbackData.questions[i].id = addedQuestion.id;
//        });
//        console.log("feedbackData out", feedbackData);
//        return feedbackData;
//      });
//      return cy
//        .addQuestions(feedbackData.questionnaireId, feedbackData.questions)
//        .then(addedQuestions => {
//          console.log("addedQuestions", addedQuestions);
//          feedbackData.questions = addedQuestions;
//          return feedbackData;
//        });
//    });
//});
//  return addQuestionnaire(questionniareReq).then(questionnaireResult => {
//    feedbackData.questionnaireId = questionnaireResult.id;
//    feedbackData.questions.forEach((question, index) => {
//      const questionReq = {
//        questionnaireid: questionnaireResult.id,
//        question: question.question
//      };
//      addQuestion(questionReq).then(questionResult => {
//        // Add feedback here
//        feedbackData.questions[index].id = questionResult.id;
//        console.log(feedbackData);
//        return feedbackData;
//      });
//    });
//  });
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
