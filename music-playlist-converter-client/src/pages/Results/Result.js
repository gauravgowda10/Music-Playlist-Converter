import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader"
// import { Redirect } from 'react-router-dom';
import { v1 as uuidv1 } from 'uuid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
// import { apple_auth } from '../../apple/apple-provider'
// import { addPlaylistToApple } from '../../modules/actions/apple-actions'
import success from '../../svg/success-svgrepo-com.svg'

import './style.scss'

class Result extends React.Component {
    constructor() {
        super()
        this.state = {
            transfer: [],
            loading: true,
            redirect: false,
            not_added: [],
            tabs: [],
            current_platform: '',
            foundjams: [],
            current_song: '',
            current_playlist: ''
        }
    }

    // componentDidMount() {
    //     if (!apple_auth.isLoggedIn()) {
    //         this.setState({ redirect: true })
    //     }
    //     this.props.addPlaylistToApple(this.props.transfer)
    // }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.transferDone !== prevProps.transferDone) {
            this.setState({
                loading: false,
                not_added: this.props.songsNotFound
            })
        }
    }

    spinnerCss() {
        return (`height: 50vh;
        display: block;
        margin: 0 auto;
        margin-top: 50px;`)
    }

    success() {
        return (
            <div >
                <img alt="success" src={success} />
                <h1>Success!</h1>
                <p>Your playlists have been added to your Apple Music Account. Wait for 15 - 30 seconds and it should show up on the app.</p>
                {this.state.not_added.length > 0 ?
                    <div className="added">
                        <h3>These songs could not be added: </h3>
                        <div className="not-added">
                            {this.state.not_added.map(function (item) {
                                return (
                                    <div key={uuidv1()} className="tab">
                                        <h3>{item.name}</h3>
                                        <ul>
                                            {
                                                item.tracks.map(function (track) {
                                                    return <li key={uuidv1()}>{track}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                        <p>
                            These songs could not be found on {this.state.current_platform} because the name of the song may be different on {this.state.current_platform} or the artist name
                            is different on {this.state.current_platform} or they do not exist on {this.state.current_platform}.
                            <br></br>
                            Feel free to search for them and add them manually to your playlist.
                        </p>
                    </div>
                    :
                    <div style={{
                        marginTop: '40px',
                        marginBottom: '40px'

                    }}>All the songs were added.</div>
                }
            </div>
        )
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to="/" />;
        // }
        return (
            <div className="main-container results">
                {!this.state.loading ?
                    <div style={{
                        marginTop: '50px'
                    }}>
                        <p>Searching for songs in the playlists and adding them. </p>
                        <ScaleLoader size={150} css={this.spinnerCss()} color={"#123abc"} />
                    </div>

                    : this.success()}
            </div>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         songsNotFound: state.apple_reducer.songsNotFound,
//         transferDone: state.apple_reducer.transferDone,
//         currentPlaylist: state.apple_reducer.currentPlaylist,
//         currentSong: state.apple_reducer.currentSong
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         addPlaylistToApple: bindActionCreators(addPlaylistToApple, dispatch)
//     };
// }

export default Result