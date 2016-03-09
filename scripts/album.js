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

var child = document.getElementsByClassName('album-view-title')[0];
var noParent = document.querySelector('html');

var findParentByClassName = function(targetClass, element) {
  var currentParent = element.parentElement;

  if (currentParent) {
    while (currentParent.className && currentParent.className != targetClass) {
      currentParent = currentParent.parentElement;
    }

    if (currentParent.className == targetClass) {
      return currentParent;
    } else {
      alert("no parent found with that class name");
    }
  } else {
    alert("no parent found");
  }
};

// Add a function to get the songItem by element
var getSongItem = function(element) {
  // summary:
  //   Gets a song item based on a provided element
  // element: Node
  //   Element related to the song item node in some way
  // returns: Node
  switch(element.className) {
    // Purposefully falling through: Children of song-item-number
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName('song-item-number', element);
    case 'album-view-song-item': // falling through because parent
      return element.querySelector('.song-item-number');
    case 'song-item-title':// falling through because sibling
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

var overSongItem = null;

window.onload = function() {
  setCurrentAlbum(albumAllHailWestTexas);

  var albumImage = document.getElementsByClassName('album-cover-art')[0];
  var albums = [albumAllHailWestTexas, albumLifeAndDeath, albumKnowByHeart];
  var index = 0;

  // listen for click on album cover
  // when clicked cycle album object

  albumImage.addEventListener("click", function(event) {
    // if the index reaches the end of our albums collection,
    // start back at the top. Otheriwse, go to the next
    (index == (albums.length - 1)) ? index = 0 : index++;

    setCurrentAlbum(albums[index]);
  });

  // switch to play button when hovering over rows
  songListContainer.addEventListener('mouseover', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
      overSongItem = getSongItem(event.target);

      if (overSongItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
        overSongItem.innerHTML = playButtonTemplate;
      }
    }
  });

  // mouseleave does not bubble
  // that's why there's a loop
  // mouseout does bubble
  // and acts in a very similar fashion
  //
  // homework: change the functions below to use event delegation:
  // for both the mouseleave (which should be mouseout) and the click

    // switch back to track number when leaving row
  songListContainer.addEventListener('mouseout', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      if (songItemNumber !== currentlyPlayingSong) {
        console.log(event.relatedTarget, overSongItem);
        if (event.relatedTarget !== songItem) {
          songItem.innerHTML = songItemNumber;
        }
      } else {
        songItem.innerHTML = pauseButtonTemplate;
      }
    }
  });

  songListContainer.addEventListener('click', function(event) {
    clickHandler(event.target);
  });
};


