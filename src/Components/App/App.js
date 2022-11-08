import './App.css';
import React from 'react';

import { SearchResults } from '../SearchResults/SearchResults';
import { SearchBar } from '../SearchBar/SearchBar';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],                 
      playlistName: 'playlist1',
      playlistTracks: []
    };
    this.addTrack= this.addTrack.bind(this);
    this.removeTrack= this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(myPlaylistName){
    this.setState({playlistName: myPlaylistName });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>{
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      })
    })
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }

  render(){
   return( <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
        <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
        <SearchResults searchResults={this.state.searchResults} 
                       onAdd={this.addTrack}
                       onRemove={this.removeTrack}/>
        <Playlist playlistName={this.state.playlistName} 
                  playlistTracks={this.state.playlistTracks} 
                  onNameChange={this.state.updatePlaylistName}
                  onSave={this.state.savePlaylist}/>
    </div>
  </div>
</div>
   )
  }
}

export default App;
