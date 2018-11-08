$.getJSON('https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=key2m8VgwGT2iztad',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      var picture = record.fields['Pictures'];
      html.push(listView(name, address, rating, picture));
    });
    $('body').append(html);
  }
);

var listView = function(name, address, rating, picture) {
  return `
    <h2>${name}</h2>
    <p>${address}</p>
    <p>${rating}</p>
    ${picture ? `<img src="${picture[0].url}">` : ``}
  `;
}
