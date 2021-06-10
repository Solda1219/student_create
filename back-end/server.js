const app = require("./app");
const setting = require("./config/setting");
if (require.main === module) {
  setting.sqlDriver.connect((err) => {
    if (err) throw err;
    console.log('My sql connected!');
  });
  app.listen(setting.port, ()=> {
    console.log('server is working on port:'+setting.port)
  });
}
