const User = require("../models/userModel");
exports.register = async (req, res) => {
  const [user, created] = await User.findOrCreate({
    where: { name: "bobs" },
    defaults: {
      name: "Technical Lead JavaScript",
    },
  });
  console.log(user.name); // 'sdepold'
  console.log(created); // The boolean indicating whether this instance was just created
  if (created) {
    console.log(user.name); // This will certainly be 'Technical Lead JavaScript'
  }
};
