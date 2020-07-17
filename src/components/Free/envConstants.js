const tags = [
  { label: "Sciences", value: "sciences" },
  { label: "Mathematic", value: "mathematic" },
  { label: "Technology", value: "technology" },
  { label: "Social", value: "social" },
];

const previewImg = (e) => {
  var imageField = document.querySelector("#img-preview");
  var reader = new FileReader();
  reader.onload = () => {
    if (reader.readyState === 2) {
      imageField.src = reader.result;
    }
  };
  reader.readAsDataURL(e.target.files[0]);
  return;
};

const fields = [
  {
    name: "name",
    placeholder: "NAME OF WEBSITE",
    type: "text",
    classN: "form-control",
  },
  {
    name: "phrase",
    placeholder: "PHRASE",
    type: "text",
    classN: "form-control",
  },
  {
    name: "url",
    placeholder: "URL",
    type: "url",
    classN: "form-control",
  },
];
const languagesOptions = ["spanish", "english", "german"];

export { tags, previewImg, fields, languagesOptions };
