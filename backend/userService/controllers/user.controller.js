// Public access
// /api/content/all 
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// For logged in users (role: user, admin)
// /api/content/user
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

// For users having admin role 
// /api/content/admin
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};