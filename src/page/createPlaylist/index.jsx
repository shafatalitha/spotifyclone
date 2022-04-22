import Search from "../../Component/search";
import { useState } from "react";
import Form from "../../Component/form";
import "./index.css";
import Tracks from "../../Component/tracks";

const CreatePlayList = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState([]);

  const onSuccessSearch = (tracks) => {
    const selectedTracks = filterSelectedTracks();
    const searchDistincTracks = tracks.filter(
      (track) => !selected.includes(track.uri)
    );

    setTracks([...selectedTracks, ...searchDistincTracks]);
  };

  const toggleSelect = (track) => {
    const uri = track.uri;

    if (selected.includes(uri)) {
      setSelected(selected.filter((item) => item !== uri));
    } else {
      setSelected([...selected, uri]);
    }
  };

  const filterSelectedTracks = () => {
    return tracks.filter((track) => selected.includes(track.uri));
  };
  console.log(tracks)
  return (
    <div className="home">
      <div className="create-playlist">
        <Form uriTracks={selected} />
      </div>
      <div className="search-bar">
        <Search onSuccess={(tracks) => onSuccessSearch(tracks)} />
      </div>
      <div className="songs"data-testid="tracks-list">
        {tracks.map((track) => (
          <Tracks
            key={track.id}
            img={track.album.images[0].url}
            title={track.name}
            artist={track.artists[0].name}
            albumname={track.album.images[0].name}
            duration={track.duration_ms}
            toggleSelect={() => toggleSelect(track)}
          />
        ))}
      </div>
    </div>
  );
};

export default CreatePlayList;
