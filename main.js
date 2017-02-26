var state = {
  currentDate: "19870218",
  rawData: [],
  currentURL: function(){
    return `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3047b4f43aa340b1a9976a2cefadbf7f&begin_date=${state.currentDate}&end_date=${state.currentDate}&fq=section_name:front%20page`;
  }
  // example string for 2/18/87: https://api.nytimes.com/svc/search/v2/articlesearch.json
  //?api-key=3047b4f43aa340b1a9976a2cefadbf7f&begin_date=19870218&end_date=19870218&fq=section_name:front
}

function getData(callback){
  $.ajax({
    url: state.currentURL(),
    method: 'GET',
    success: callback
  });
}

function addToState(data){
  state.rawData = data.response.docs;
}

function display(state) {
   $('.container').empty();
    state.rawData.forEach(function(article) {
        var artContents = `<div class="article-div">
                      <img src="NYTlogo.png" alt="NYT Logo" class="logo-img">
                      <h3>${article.headline.main}</h3>
                      <p>
                      <div class="inner">
                        <h5>${article.lead_paragraph} <a href="${article.web_url}">More...</a></h5>
                      </div>
                    </div>`
        $('.container').append(artContents);
    });
    state.rawData=[];
}

function init(data){
  addToState(data);
  display(state);
}

function eventListener(){
  $('#search').submit(function(e) {
    e.preventDefault();
    state.currentDate = $('#date-selection').val().replace(/-/g,"");
    getData(init);
  });
}

$(eventListener);
