import { client } from './sanity';

export async function getLabels() {
  return client.fetch(`*[_type == "label"]| order(lower(labelName) asc) {
    "id": _id,
    labelName,
    backgroundColor,
    fontColor,
  }`);
}
