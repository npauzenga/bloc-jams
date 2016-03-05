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

var createSongRow = function(songNumber, songName, songLength) {
  var template =
    '<tr class="album-view-song-item">'
  + ' <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
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

var findParentByClassName = function(targetClass, element) {
  var currentParent = element.parentElement;

  if (currentParent == null) {
    return element;
  }

  if (currentParent.className != targetClass) {
    currentParent = currentParent.parentElement;
    findParentByClassName(targetClass, currentParent);
  }
  return currentParent;
};

var getSongItem = function(element) {
  switch(element.className) {
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName('song-item-number', element);
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    case 'song-item-title':
    case 'song-item-duration':
      return findParentByClassName('album-view-song-item', element).querySelector('.song-item-number');
    case 'song-item-number':
      return element;
    default:
      return;
  }
};

var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);
  if (currentlyPlayingSong === null) {
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
    songItem.innerHTML = playButtonTemplate;
    currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
    currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
    songItem.innerHTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }
};

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

window.onload = function() {
  setCurrentAlbum(albumAllHailWestTexas);

  // switch to play button when hovering over rows
  songListContainer.addEventListener('mouseover', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
      var songItem = getSongItem(event.target);

      if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        songItem.innerHTML = playButtonTemplate;
      }
    }
  });

  for (var i = 0, j = songRows.length; i < j; i++) {
    // switch back to track number when leaving row
    songRows[i].addEventListener('mouseleave', function(event) {
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      if (songItemNumber !== currentlyPlayingSong) {
        songItem.innerHTML = songItemNumber;
      } else {
        songItem.innerHTML = pauseButtonTemplate;
      }
    });

    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target);
    });
  }
};
