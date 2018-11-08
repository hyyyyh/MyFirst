require.config({
    baseUrl: "/js/",
    paths: {
        "jquery": "../lib/bower_components/jquery/dist/jquery.min.js",
        "bootstrap":"../lib/bower_components/bootstrap/dist/js/bootstrap.min.js",
        "alertify":"components/alertify.js",
        "select2":"components/select2.min.js",
        "datetime":"../lib/bower_components/smalot-bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js",
        "datetime-CN":"../lib/bower_components/smalot-bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js",
        "jquery-qrcode":"../lib/bower_components/jquery-qrcode/jquery.qrcode.min.js",
        "webuploader":"../lib/bower_components/fex-webuploader/dist/webuploader.min.js",
        "datatables":"../lib/bower_components/datatables/media/js/dataTables.bootstrap.min.js",
        "vue":"../lib/bower_components/vue/dist/vue.min.js",
        "comm":"chinalife/comm.js",
        "restUrl":"chinalife/restUrl.js",
        "template":"components/template.js",
        "dataTables":"../lib/bower_components/datatables/media/js/jquery.dataTables.min.js",
        "dataTables-bootstrap":"../lib/bower_components/datatables/media/js/dataTables.bootstrap.min.js",
        "ajaxfileupload":"components/ajaxfileupload.js",
        "circliful":"components/jquery.circliful.min.js",//绘制图标图标的js
        //"echarts":"components/echarts.simple.min.js",
        "echarts":"components/echarts.min.js",
        "circliful":"../lib/bower_components/circliful/js/jquery.circliful.min.js",
        "mricode":"components/mricode.pagination.js",
        "commPage":"commPage.js"


    },
    shim: {
        jquery:{
            deps:["template"]
        },
        select2: {
            deps: ["jquery"]
        },
        datatables:{
            deps: ["jquery"]
        },
        bootstrap: {
            deps: ["jquery"]
        },
        webuploader: {
            deps: ["jquery"]
        },
        alertify: {
            deps: ["jquery"],
            exports: "alertify"
        },
        "jquery-qrcode": {
            deps: ["jquery"]
        },
        "comm": {
            deps: ["jquery"]
        },
        "datetime": {
            deps: ["jquery"],
            exports: "$.fn.daterangepicker"
        },
        "datetime-CN": {
            deps: ["jquery",'datetime'],
            exports: "$.fn.daterangepicker"
        },
        "dataTables":{
            deps:["jquery"]
        },
        "dataTables-bootstrap":{
            deps:["dataTables"]
        },
        "ajaxfileupload":{
            deps:["jquery"]
        },
        "circliful":{
            deps:["jquery"],
            exports: "$.fn.circliful"
        },
        "commPage":{
            deps:["jquery",'select2']

        }
    }
});