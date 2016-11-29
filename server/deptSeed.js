'use strict';
let sqldb = require ('./sqldb');

let Department = sqldb.Department;
Department.sync()
  .then(() => Department.destroy({where: {}}))
  .then(() => {
    Department.bulkCreate([{
      name: 'OKCPD',
      address: '123 Abc Street, OKC OK 12345'
    }, {
      name: 'DALLASPD',
      address: '123 Abc Street, DALLAS TX 88888'
    }])
      .then(() => {
        console.log('finished populating DEPARTMENTS');
      });
  });
