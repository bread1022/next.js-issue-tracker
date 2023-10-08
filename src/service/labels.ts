import { client } from './sanity';

export default async function getLabels() {
  return client.fetch(`*[_type == "label"]| order(labelName asc) {
    "id": _id,
    labelName,
    backgroundColor,
    fontColor,
  }`);
}
