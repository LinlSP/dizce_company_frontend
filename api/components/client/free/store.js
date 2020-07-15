const { cloudinary } = require("../../../utils/cloudinary");

const addSite = async (collection, user, site) => {
  const { nick } = user;
  const { logo, name, language, phrase, description, url, tags } = site;
  const cloudinary_options = {
    public_id: `All/Services/Free/${language}/${name}`,
  };
  try {
    const coincidences = await collection.findOne(
      { name: name },
      { projection: { _id: 0, name: 1 } }
    );
    if (coincidences !== null) {
      return Promise.reject({
        error: "This site name already exists",
        status: 400,
      });
    }
    const uploadedLogo = await cloudinary.uploader.upload(
      logo.path,
      cloudinary_options
    );
    const logoUrl = uploadedLogo.url;
    await collection.insertOne(
      {
        name: name,
        language: language,
        phrase: phrase,
        description: description,
        url: url,
        tags: tags,
        logoUrl: logoUrl,
        created: {
          at: new Date(),
          by: nick,
        },
      },
      { writeConcern: 2 }
    );
    return "Site successfully created";
  } catch (error) {
    console.log(error);
    return Promise.reject({});
  }
};

const getSite = async (collection, name) => {
  try {
    const site = await collection.findOne({ name: name });
    if (!site)
      return Promise.reject({ error: "No site with that name", status: 400 });
    return site;
  } catch (error) {
    console.log(error);
    return Promise.reject({});
  }
};

const updateSite = async (collection, user, site) => {
  const { nick } = user;
  const {
    logo,
    name,
    language,
    phrase,
    description,
    url,
    tags,
    prevLogoUrl,
  } = site;
  const cloudinary_options = {
    public_id: `All/Services/Free/${language}/${name}`,
  };
  var logoUrl = prevLogoUrl;
  try {
    if (logo) {
      const uploadedLogo = await cloudinary.uploader.upload(
        logo.path,
        cloudinary_options
      );
      logoUrl = uploadedLogo.url;
    }
    await collection.updateOne(
      { name: name },
      {
        $set: {
          name: name,
          language: language,
          phrase: phrase,
          description: description,
          url: url,
          tags: tags,
          logoUrl: logoUrl,
          lastUpdated: {
            at: new Date(),
            by: nick,
          },
        },
      },
      { writeConcern: 2 }
    );
    return "Site successfully updated";
  } catch (error) {
    console.log(error);
    return Promise.reject({});
  }
};

const deleteSite = async (collection, name, language) => {
  const logo_publicID = `All/Services/Free/${language}/${name}`;
  try {
    const { result } = await cloudinary.uploader.destroy(logo_publicID);
    if (result === "not found")
      return Promise.reject({
        error: "Site not found",
        status: "400",
      });
    await collection.deleteOne(
      { name: name },
      {
        justOne: true,
        writeConcern: 2,
      }
    );
    return "Site successfully deleted";
  } catch (error) {
    console.log(error);
    return Promise.reject({});
  }
};

module.exports = {
  add: addSite,
  get: getSite,
  delete: deleteSite,
  update: updateSite,
};
