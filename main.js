$.getJSON('https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=key2m8VgwGT2iztad',
  function(airtable){
    var html = [];
    $.each(airtable.records, function(index, record) {
      var name = record.fields['Name'];
      var address = record.fields['Address'];
      var rating = record.fields['Rating'];
      var picture = record.fields['Pictures'];
      // console.log(picture);
      if(picture[0]) {
        html.push(`<img src="${picture[0].url}" />`)
      }
      html.push(`<h2>${name}, ${address}, ${rating}</h2>`);
    });
    $('body').append(html);
  }
);
