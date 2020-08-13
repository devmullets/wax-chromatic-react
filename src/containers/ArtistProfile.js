import React, { useState, useEffect } from 'react';
import ArtistBio from '../components/ArtistBio';
import ReleaseGrid from '../components/ReleaseGrid';

const waxUrl = 'http://localhost:3000/api/v1'

const ArtistProfile = (props) => {
  const artistId = props.location.state.artist.id // from router push
  const [ artistInfo, setArtistInfo ] = useState()
    // first let's get artist profile
  useEffect(() => {
    console.log('checking for artist ', artistId)
    fetch(`${waxUrl}/artists/${artistId}`)
      .then(response => response.json())
      .then(artistInfo => setArtistInfo(artistInfo))
      .catch(error => console.log('error getting artist ', error))
  }, [artistId]);

  return (
    <>
      <ArtistBio 
        name={artistInfo ? artistInfo.name : null}
        profile={artistInfo ? artistInfo.bio : null}
        artistId={artistInfo ? artistInfo.id : null}
        />
      { artistInfo ? 
        <ReleaseGrid
        artistInfo={artistInfo}
      /> 
      : null }
    </>
  );
}

export default ArtistProfile;
