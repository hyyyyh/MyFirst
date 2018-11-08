require.config({
    baseUrl: "/vassmobileweb/js/",
    paths: {
        "jquery": "components/jquery.min.js",
        "slider":"components/slider.js",
        "config":"chinalife/config.js",
        "comm":"chinalife/comm.js",
        "restUrl":"chinalife/restUrl.js",
        "alertify":"components/alertify.js",
        "proaress":"components/proaress.js"

    },
    shim: {

        slider: {
            deps: ["jquery"]
        },
        config:{
            deps: ["jquery"]
        },
        comm: {
            deps: ["jquery"]
        },
        restUrl: {
            deps: ["jquery"]
        },
         alertify: {
             deps: ["jquery"],
             exports: "alertify"
         },
        proaress:{
            deps: ["jquery"]
        }

        // datatables:{
        //     deps: ["jquery"]
        // },
        // bootstrap: {
        //     deps: ["jquery"]
        // },
        // webuploader: {
        //     deps: ["jquery"]
        // },
        // alertify: {
        //     deps: ["jquery"],
        //     exports: "alertify"
        // },
        // "jquery-qrcode": {
        //     deps: ["jquery"]
        // },
        // "comm": {
        //     deps: ["jquery"]
        // },
        // "datetime": {
        //     deps: ["jquery"],
        //     exports: "$.fn.daterangepicker"
        // },
        // "datetime-CN": {
        //     deps: ["jquery",'datetime'],
        //     exports: "$.fn.daterangepicker"
        // },
        // "dataTables":{
        //     deps:["jquery"]
        // },
        // "dataTables-bootstrap":{
        //     deps:["dataTables"]
        // },
        // "ajaxfileupload":{
        //     deps:["jquery"]
        // },
        // "circliful":{
        //     deps:["jquery"],
        //     exports: "$.fn.circliful"
        // },
        // "commPage":{
        //     deps:["jquery",'select2']

        // }
    }
});