import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Contexts/AuthContext";
import { Container, AddForm, Input, PreviewImg, SelectWrapper } from "./styles";
import { vh } from "../../../styles/Height";
import MultiSelect from "react-multi-select-component";
import Swal from "sweetalert2";
import { tags, previewImg, fields, languagesOptions } from "../envConstants";

//////It is easier to get all the fields of a form with the constructor than with states,
//////That's why I am not using states for the form
export const AddFree = () => {
  const { authState } = useContext(AuthContext);
  const { jwt } = authState;

  const [selected, setSelected] = useState([]);
  const [language, setLanguage] = useState("none");
  const [loading, setLoading] = useState(false);

  const resetForm = (form) => {
    form.reset();
    document.querySelector("#img-preview").src = "";
    setSelected([]);
    setLanguage("none");
    return;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const tags = selected.map(({ value }) => value);
    const addform = document.querySelector("#add-form");
    const formData = new FormData(addform);
    formData.append("tags", tags);

    return Swal.fire({
      title: "Are you sure?",
      text: "Check the fields again",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add website!",
    }).then((result) => {
      if (result.value) {
        setLoading(true);
        axios
          .post("/api/client/free/add", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer" + " " + jwt,
            },
          })
          .then(({ data }) => {
            const { response } = data;
            resetForm(addform);
            setLoading(false);
            return Swal.fire("Added!", response, "success");
          })
          .catch(({ response }) => {
            const { error } = response.data;
            setLoading(false);
            return Swal.fire("Canceled", error, "error");
          });
      }
    });
  };

  return (
    <Container className="container">
      <AddForm id="add-form" onSubmit={(e) => onSubmit(e)}>
        <div
          id="file-preview"
          className="input-file"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PreviewImg disabled={loading} id="img-preview" src="" alt="" />
          <label
            style={{
              position: "relative",
              width: "100%",
              textAlign: "center",
              marginBottom: `${1 * vh}px`,
              cursor: "pointer",
            }}
            className="custom-file-label"
            htmlFor="logo"
          >
            Select Logo...
          </label>
          <hr
            style={{
              background: "black",
              height: `${1 * vh}px`,
              width: "100%",
              borderRadius: `${4 * vh}px`,
            }}
          />
        </div>

        <Input
          name="logo"
          id="logo"
          accept="image/*"
          type="file"
          className="custom-file-input"
          extra={"display: none;"}
          onChange={(e) => previewImg(e)}
          disabled={loading}
          required
        />

        {fields.map(({ name, placeholder, type, classN }, index) => (
          <Input
            key={index}
            disabled={loading}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            className={classN}
            required
          />
        ))}

        <select
          className="form-control"
          name="language"
          style={{ marginBottom: `${2 * vh}px` }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={loading}
          required
        >
          <option value="none" disabled hidden>
            Select language ...
          </option>
          {languagesOptions.map((lang, index) => (
            <option value={lang} key={index}>
              {lang}
            </option>
          ))}
        </select>

        <SelectWrapper disabled={loading}>
          <MultiSelect
            id="multiselect"
            options={tags}
            value={selected}
            onChange={setSelected}
            labelledBy={"Select"}
            overrideStrings={{
              selectSomeItems: "TAGS...",
              allItemsAreSelected: "All Tags are selected.",
              selectAll: "Select all Tags",
            }}
            disabled={loading}
          />
        </SelectWrapper>

        <textarea
          name="description"
          placeholder="DESCRIPTION"
          className="form-control"
          style={{ marginBottom: `${2 * vh}px` }}
          disabled={loading}
          required
        />

        <Input
          disabled={loading}
          type="submit"
          value="Add"
          className="btn btn-primary"
        />
        <div
          className="btn btn-danger"
          style={{
            width: "100%",
            marginBottom: `${2 * vh}px`,
            cursor: "pointer",
          }}
          onClick={() => resetForm(document.querySelector("#add-form"))}
        >
          Cancel
        </div>
      </AddForm>
    </Container>
  );
};
