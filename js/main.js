//listener for form submit
document.getElementById('myform').addEventListener('submit',saveBookmark)

function saveBookmark(e){
  var siteName = document.getElementById('site-name').value
  var siteURL = document.getElementById('site-url').value

  if(!validateForm(siteName, siteURL)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL
  }
  /*
    //local storage test:
    localStorage.setItem('test','hello world')
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test')
    console.log(localStorage.getItem('test'));
  */


  if (localStorage.getItem('bookmarks')===null) {
    //init array
    var bookmarks=[];
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  } else{
    //fetch local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }
  fetchBookmark()

  document.getElementById('myform').reset();

  e.preventDefault();
}

function fetchBookmark(){
  //fetch local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  var bookmarksResults = document.getElementById('bookmarksResults')

  bookmarksResults.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name
    var url = bookmarks[i].url

    bookmarksResults.innerHTML += '<div class ="well">'+
                                  '<h3>'+name+
                                  ' <a class ="btn btn-default" target="_blank" href="'+url+ '">Visit</a> '+
                                  ' <a class ="btn btn-danger" href="#" onclick="deleteBookmark(\''+url+'\')">Delete</a> '+
                                  '</h3>'+
                                  '</div>';
  }
}

function deleteBookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  for(var i = 0; i<bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i,1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  //re-fetch bookmark
  fetchBookmark();
}


function validateForm(siteName, siteURL){
  if(!siteName || !siteURL){
    alert('Please fill in the form')
    return false
  }


  return true;
}
