window.onload = function() {
  var pages = {
    index: {
      url: "pages/index.html"
    },
    czj: {
      url: "pages/czj.html"
    },
    joli: {
      url: "pages/joli.html"
    },
    robintunney: {
      url: "pages/robintunney.html"
    }
  }

  var navLinks = document.querySelectorAll('.load-content');
  var contentElement = document.getElementById('content');
  
  var updateContent = function(stateObj) {
    if (stateObj) {
      contentElement.innerHTML = stateObj.content;
    }
  };

  var loadContent = function(url, callback) {
    var request = new XMLHttpRequest();
    request.onload = function(response) {
      pages[url.split('.')[0]].content = response.target.response;
      var pageData = pages[url.split('.')[0]];
      updateContent(pageData);
      callback();
    };
    request.open('get', 'pages/' + url, true);
    request.send();
  };

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function(e) {
      e.preventDefault();
      var pageURL = this.attributes['href'].value;
      loadContent(pageURL, function() {
        var pageData = pages[pageURL.split('.')[0]];
        history.pushState(pageData, pageData.title, pageURL);
      });
    });
  }
  
  window.addEventListener('popstate', function(event) {
    updateContent(event.state);
  });
  
  loadContent('index.html', function() {
    history.replaceState(pages.index, pages.index.title, '');
  });
  
};
