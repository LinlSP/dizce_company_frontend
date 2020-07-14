const store = require("./store");

const addSite = (collection, user, site) => {
  const { logo, name, language, phrase, description, url, tags } = site;

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

module.exports = {
  addSite,
};
