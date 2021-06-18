const router = require('express').Router();
//middleware
const requireAuth = require('../middlewares/requireAuth');
const requireAdmin = require('../middlewares/requireAdmin');
const requireSuper = require('../middlewares/requireSuper');
//controller
const userController = require('../controller/user')
const accountController = require('../controller/account')
const groupController = require('../controller/group')
const studentController= require('../controller/student')

const stateController= require('../controller/state')
//user authentication
router.post('/user/login',userController.login);

//account manage
router.get('/account/admin/getAdmins', [requireAuth], accountController.getAdmins);
router.post('/account/admin/update', [requireAuth, requireSuper], accountController.updateAdmin);
router.post('/account/admin/create', [requireAuth, requireSuper], accountController.createAdmin);
router.get('/account/admin/delete/:adminId', [requireAuth, requireSuper], accountController.deleteAdmin);

router.post('/account/admin/createAdmins',[requireAuth,requireSuper],accountController.createAdmins);
router.post('/account/admin/editAdmins',[requireAuth,requireSuper],accountController.editAdmins);
router.post('/account/admin/delAdmins',[requireAuth,requireSuper],accountController.delAdmins);
router.post('/account/admin/resetPasswordAdmin',[requireAuth,requireSuper],accountController.resetPasswordAdmin);

router.post('/account/user/getUser',[requireAuth,requireAdmin],accountController.getUser);
router.post('/account/user/createUser',[requireAuth,requireAdmin],accountController.createUser);
router.post('/account/user/editUser',[requireAuth,requireAdmin],accountController.editUser);
router.post('/account/user/delUser',[requireAuth,requireAdmin],accountController.delUser);
router.post('/account/user/resetPasswordUser',[requireAuth,requireAdmin],accountController.resetPasswordUser);
//group manage
router.post('/group/group/getGroup',[requireAuth],groupController.getGroup);
router.post('/group/group/createGroup',[requireAuth],groupController.createGroup);
router.post('/group/group/editGroup',[requireAuth],groupController.editGroup);
router.post('/group/group/delGroup',[requireAuth],groupController.delGroup);

router.post('/group/user/getUser',[requireAuth],groupController.getUser);
router.post('/group/user/createUser',[requireAuth],groupController.createUser);
router.post('/group/user/editUser',[requireAuth],groupController.editUser);
router.post('/group/user/delUser',[requireAuth],groupController.delUser);

router.post('/state/create', [requireAuth, requireSuper], stateController.createState);
router.get('/state/all', [requireAuth], stateController.getAllState);
router.post('/state/update', [requireAuth, requireSuper], stateController.updateState);
router.get('/state/delete/:stateId', [requireAuth, requireSuper], stateController.deleteState);
router.post('/state/getStatesByRole', [requireAuth], stateController.getStatesByRole);

router.post('/student/create', [requireAuth], studentController.createStudent);
router.post('/student/update', [requireAuth], studentController.updateStudent);
router.get('/students/get/:stateId', [requireAuth], studentController.getBystate);
router.get('/student/:studentId', [requireAuth], studentController.getById);
router.get('/student/delete/:studentId', [requireAuth, requireSuper], studentController.deleteStudent);
router.get('/students/getAll', [requireAuth], studentController.getAllStudent);
router.post('/students/getStudentsByRole', [requireAuth], studentController.getStudentsByRole);


// router.get('/admin/getAll', [requireAuth], adminController.getAll);
module.exports = router
