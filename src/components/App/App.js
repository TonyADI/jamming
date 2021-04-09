import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchResults: [], playlistName: '', playlistTracks: []}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }else {
     this.setState({playlistTracks: [...this.state.playlistTracks, track]})
    }
  }

  removeTrack(track){
   this.setState({
    playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
  });
    
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({playlistName: 'New Playlist', playlistTracks: []})
    alert('Playlist Saved')
  }

  search(searchName){
    Spotify.search(searchName).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
        <div>
          <div className="top-header">
            <h1 className="zero-margin">Ja<span className="highlight">mmm</span>ing</h1>
            </div>
          <div className="App">
            <h1 className="greeting">Create your own <span id="text-background">
              personalized</span> Spotify playlist</h1>
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
              <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} 
              onRemove={this.removeTrack} playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks}/>
            </div>
          </div>
        </div>
    );
  }
}

export default App;
