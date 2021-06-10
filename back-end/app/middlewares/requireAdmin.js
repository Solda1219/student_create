const requireAdmin = (req, res, next) => {
  if (req.user.role==1||req.user.role==2){
    next();
    
  } else{
    return res.status(401).json({
      message: "You are not admin."
    });
  }
};

module.exports = requireAdmin;
