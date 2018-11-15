function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var getAllRecords = function() {
  $.getJSON('https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=key2m8VgwGT2iztad',
    function(airtable){
      var html = [];
      $.each(airtable.records, function(index, record) {
        var id = record.id;
        var name = record.fields['Name'];
        var address = record.fields['Address'];
        var rating = record.fields['Rating'];
        var picture = record.fields['Pictures'];
        html.push(listView(id, name, address, rating, picture));
      });
      $('body').append(html);
    }
  );
}

var getOneRecord = function(id) {
  $.getJSON(`https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=key2m8VgwGT2iztad`,
    function(record){
      var html = [];
      console.log(record.id)
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      var picture = record.fields['Pictures'];
      html.push(detailView(name, address, rating, picture));
      $('body').append(html);
    }
  );
}

var listView = function(id, name, address, rating, picture) {
  return `
    <h2><a href="index.html?id=${id}">${name}</a></h2>
    <p>${address}</p>
    <p>${rating}</p>
    ${picture ? `<img src="${picture[0].url}">` : ``}
  `;
}

var detailView = function(name, address, rating, picture) {
  return `
    <h2>${name}</h2>
    <p>${address}</p>
    <p>${rating}</p>
    ${picture ? `<img src="${picture[0].url}">` : ``}
  `;
}

var id = getParameterByName('id');
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}

