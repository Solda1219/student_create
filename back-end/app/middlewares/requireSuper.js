const requireAdmin = (req, res, next) => {
  if (req.user.role.includes(-1)){
    next();
    
  } else{
    return res.status(401).json({
      message: "You are not super admin."
    });
  }
};

module.exports = requireAdmin;
