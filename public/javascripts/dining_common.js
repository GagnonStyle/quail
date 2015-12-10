$(document).ready(function(){
  var queries = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  var queryHash = [];
  for(var i = 0; i < queries.length; i++) {
    var q = queries[i].split('=');
    queryHash[q[0]] = q[1];
  }
  if(queryHash['dcid']){
    $('#dc_select').val(queryHash['dcid']);
  }
  $('#dc_select').change(function(){
    var dcid = $(this).find(':selected').val();
    if(isNaN(dcid)){
      window.location.href = '/dining_commons';
    } else {
      window.location.href = '/dining_commons?dcid=' + dcid;
    }
  });



});