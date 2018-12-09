const userController = () => {

  const addUser = (req,res) => {

    const { username } = req.body;

    res.json({
      ok: username
    })
  }

  return {
    addUser
  }

}

module.exports = userController()