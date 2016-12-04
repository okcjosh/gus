'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './dashboard.routes';
const jquery = require('jquery');
export class DashboardComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}
  let handleDataTableButtons = function () {
    if ($("#datatable-buttons").length) {
      $("#datatable-buttons").DataTable({
        dom: "Bfrtip",
        buttons: [
          {
            extend: "copy",
            className: "btn-sm"
          },
          {
            extend: "csv",
            className: "btn-sm"
          },
          {
            extend: "excel",
            className: "btn-sm"
          },
          {
            extend: "pdfHtml5",
            className: "btn-sm"
          },
          {
            extend: "print",
            className: "btn-sm"
          },
        ],
        responsive: true
      });
    }


    let TableManageButtons;
    TableManageButtons = function () {
      return {
        init: function () {
          handleDataTableButtons();
        }
      };
    }();
    $('#datatable').dataTable();
    $('#datatable-keytable').DataTable({
      keys: true
    });
    $('#datatable-responsive').DataTable();
    $('#datatable-scroller').DataTable({
      ajax: "js/datatables/json/scroller-demo.json",
      deferRender: true,
      scrollY: 380,
      scrollCollapse: true,
      scroller: true
    });
    $('#datatable-fixed-header').DataTable({
      fixedHeader: true
    });
    let $datatable = $('#datatable-checkbox');
    $datatable.dataTable({
      'order': [[1, 'asc']],
      'columnDefs': [
        {orderable: false, targets: [0]}
      ]
    });
    $datatable.on('draw.dt', function () {
      $('input').iCheck({
        checkboxClass: 'icheckbox_flat-green'
      });
    });
    TableManageButtons.init();
  };


export default angular.module('gusApp.dashboard', [uiRouter])
  .config(routes)
  .component('dashboard', {
    template: require('./dashboard.html'),
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  })
  .name;
