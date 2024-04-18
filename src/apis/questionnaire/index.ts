import request from "../request";

export function getDepartmentListApi() {
  return request("/hda/questionnaire/getQuestionnairesList", "GET");
}
