var albumAllHailWestTexas = {
  title: "All Hail West Texas",
  artist: "The Mountain Goats",
  label: "Rough Trade",
  year: "2001",
  albumArtUrl: "assets/images/album_covers/01.png",
  songs: [
    { title: "Blue", duration: "4:26" },
    { title: "Green", duration: "3:26" },
    { title: "Red", duration: "4:16" },
    { title: "Pink", duration: "4:24" },
    { title: "Magenta", duration: "6:26" }
  ]
};

var albumLifeAndDeath = {
  title: "Life and Death of an American Fourtracker",
  artist: "John Vanderslice",
  label: "Barsuk",
  year: "2003",
  albumArtUrl: "assets/images/album_covers/01.png",
  songs: [
    { title: "Blue", duration: "4:26" },
    { title: "Green", duration: "3:26" },
    { title: "Red", duration: "4:16" },
    { title: "Pink", duration: "4:24" },
    { title: "Magenta", duration: "6:26" }
  ]
};

var albumKnowByHeart = {
  title: "Know by Heart",
  artist: "American Analog Set",
  label: "Tiger Style",
  year: "2001",
  albumArtUrl: "assets/images/album_covers/01.png",
  songs: [
    { title: "Punk as Fuck", duration: "4:09" },
    { title: "The Only One", duration: "2:16" },
    { title: "Like Foxes Through Fences", duration: "3:37" },
    { title: "The Postman", duration: "2:59" },
  ]
};

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
  + ' <td class="song-item-number">' + songNumber + '</td>'
  + ' <td class="song-item-title">' + songName + '</td>'
  + ' <td class="song-item-duration">' + songLength + '</td>'
  + '</tr>'
  ;

  return template;
};

var setCurrentAlbum = function(album) {
  var albumTitle =       document.getElementsByClassName('album-view-title')[0];
  var albumArtist =      document.getElementsByClassName('album-view-artist')[0];
  var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
  var albumImage =       document.getElementsByClassName('album-cover-art')[0];
  var albumSongList =    document.getElementsByClassName('album-view-song-list')[0];

  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  albumSongList.innerHTML = '';

  for(var i = 0, j = album.songs.length; i < j; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
};

window.onload = function() {
  setCurrentAlbum(albumAllHailWestTexas);

  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albums = [albumAllHailWestTexas, albumLifeAndDeath, albumKnowByHeart];
  var index = 0;

  // listen for click on album cover
  // when clicked cycle album object

  albumImage.addEventListener("click", function(event) {
    setCurrentAlbum(albums[index]);

    // if the index reaches the end of our albums collection,
    // start back at the top. Otheriwse, go to the next

    (index == (albums.length - 1)) ? index = 0 : index++;
  });
};


