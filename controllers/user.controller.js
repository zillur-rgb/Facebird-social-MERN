const getUser = async (req, res) => {
  res.send("<h1>Single user is fetched</h1>");
};

export const UserController = {
  getUser,
};
