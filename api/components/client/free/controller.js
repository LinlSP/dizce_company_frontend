const store = require("./store");

const addSite = (collection, user, site) => {
  const { logo, name, language, phrase, description, url } = site;

  if (!logo) return Promise.reject({ error: "Logo missing", status: 400 });
  if (site.tags === "") {
    return Promise.reject({ error: "Tags missing", status: 400 });
  }
  if ((!name, !language, !phrase, !description, !url))
    return Promise.reject({
      error: "Fields missing",
      status: 400,
    });

  site.tags = site.tags.split(",");
  return store.add(collection, user, site);
};

const getSite = (collection, name) => {
  if (!name)
    return Promise.reject({ error: "No name was submitted", status: 400 });
  return store.get(collection, name);
};

const updateSite = (collection, user, site) => {
  const { name, language, phrase, description, url, prevLogoUrl } = site;

  if (!prevLogoUrl)
    return Promise.reject({ error: "Previous Logo_Url missing", status: 400 });
  if (site.tags === "") {
    return Promise.reject({ error: "Tags missing", status: 400 });
  }
  if ((!name, !language, !phrase, !description, !url))
    return Promise.reject({
      error: "Fields missing",
      status: 400,
    });

  site.tags = site.tags.split(",");
  return store.update(collection, user, site);
};

const deleteSite = (collection, name, language) => {
  if (!name)
    return Promise.reject({ error: "No name was submitted", status: 400 });
  if (!language)
    return Promise.reject({ error: "No language was submitted", status: 400 });
  return store.delete(collection, name, language);
};

module.exports = {
  addSite,
  getSite,
  deleteSite,
  updateSite,
};
