import React from "react";
import SearchBar from "./SearchBar";
import youtube from "../api/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

const API_KEY =  'AIzaSyAWn9R0vkhTo3BLewpsGVeg-sNP8RGrAI8';

class App extends React.Component {
    state = {videos:[], selectedVideo: null};

    componentDidMount() {
        this.onSearchSubmit("chitrahar pec");
    }

    onSearchSubmit = async (term) => {
        const response = await youtube.get("/search/", {
            params: {
                q: term,
                part: 'snippet',
                maxResults: 5,
                key: API_KEY,
                type: 'video'
            }
        });
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    };

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video});
    };

    render() {
        return (
            <div className="ui container">
                <SearchBar onSubmit={this.onSearchSubmit}/>
                <div className="ui grid">
                    <div className="row">
                        <div className="eleven wide column" >
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column" >
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;