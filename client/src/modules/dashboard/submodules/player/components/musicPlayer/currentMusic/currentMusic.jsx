import "./currentMusic.css"

export default function CurrentMusic ({props}){
    const {trackData} = props
    console.log(trackData, "aqui album")

    return(
        <div className="songAlbumArtist">
            <img src={trackData?.album?.cover_medium} className="albumCover"/>
            <div className="songInfo">
            <p className="singer">{trackData?.artist?.name}</p>
            <p className="album">{trackData?.album?.title} </p>
            <p className="track">{trackData?.title} </p>
            </div>
        </div>
    )
}