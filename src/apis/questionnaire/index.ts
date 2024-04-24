import request from "../request";
import { SubmitQuestionnairesInter } from "./types";

export function getQuestionnairesListApi() {
  return request("/hda/questionnaire/getQuestionnairesList", "GET");
}

export function submitQuestionnairesApi(data: SubmitQuestionnairesInter) {
  return request("/hda/questionnaire/submitQuestionnaires", "POST", data);
}
