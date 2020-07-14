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
    return "Site added successfully";
  } catch (error) {
    return Promise.reject({});
  }
};

module.exports = {
  add: addSite,
};
