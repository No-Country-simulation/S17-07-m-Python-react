import React, { useState } from 'react';
import './App.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


function App() {
    const [favorites, setFavorites] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [notification, setNotification] = useState(false);

    const tracks = [
        { number: 1, title: "Song One", artists: "Artist A", duration: "3:45" },
        { number: 2, title: "Song Two", artists: "Artist B", duration: "4:00" },
        { number: 3, title: "Song Three", artists: "Artist C", duration: "2:30" },
    ];

    const backgroundStyle = {
        backgroundImage: `linear-gradient(180deg, rgba(248, 235, 217, 0.85), rgba(226, 213, 193, 0.85)), url(https://res.cloudinary.com/dfulftofe/image/upload/v1717719089/cld-sample.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const toggleFavorite = (trackNumber) => {
        if (favorites.includes(trackNumber)) {
            setFavorites(favorites.filter((fav) => fav !== trackNumber));
        } else {
            setFavorites([...favorites, trackNumber]);
            showNotification();
        }
    };

    const showNotification = () => {
        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 2000);
    };

    const selectTrack = (trackNumber) => {
        setSelectedTrack(trackNumber);
    };

    return (
        <div className="container" style={backgroundStyle}>
            {notification && (
                <div className="notification">
                    Se ha añadido a favoritos
                </div>
            )}

            <div className="recent-list">
                <AccessTimeIcon className="recent-icon" style={{ fontSize: '128px' }} />
                <div className="recent-text">Escuchados recientemente</div>
            </div>

            <div className="track-list">
                <div className="track-header">
                    <div className="header-number">#</div>
                    <div className="header-title">Título</div>
                    <div className="header-artist">Artistas</div>
                    <div className="header-duration">Duración</div>
                    <div className="header-icon-heart"></div>
                </div>

                <div className="track-body">
                    {tracks.map((track) => (
                        <div
                            key={track.number}
                            className={`track-row ${selectedTrack === track.number ? "selected" : ""}`}
                            onClick={() => selectTrack(track.number)}
                        >
                            <div className="track-number">
                                {selectedTrack === track.number ? (
                                    <PlayArrowIcon className="play-icon" />
                                ) : (
                                    `${track.number}.`
                                )}
                            </div>

                            <div className="track-title">{track.title}</div>
                            <div className="track-artist">{track.artists}</div>
                            <div className="track-duration">{track.duration}</div>
                            <div
                                className="icon-heart"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(track.number);
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                {favorites.includes(track.number) ? (
                                    <FavoriteIcon style={{ color: "red" }} />
                                ) : (
                                    <FavoriteBorderIcon style={{ color: "#201E1C" }} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
