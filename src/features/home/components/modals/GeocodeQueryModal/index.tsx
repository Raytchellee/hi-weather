import React, { useState } from "react";

interface GeocodeQueryModalProps {
  onClose: () => void;
  onSubmit: (longitude: number, latitude: number) => void;
}

const GeocodeQueryModal: React.FC<GeocodeQueryModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLongitude(Number(event.target.value));
  };

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(Number(event.target.value));
  };

  const handleSubmit = () => {
    onSubmit(longitude, latitude);
  };

  return (
    <div>
      <div>
        <label htmlFor="longitude">Longitude:</label>
        <input
          type="number"
          id="longitude"
          value={longitude}
          onChange={handleLongitudeChange}
        />
      </div>
      <div>
        <label htmlFor="latitude">Latitude:</label>
        <input
          type="number"
          id="latitude"
          value={latitude}
          onChange={handleLatitudeChange}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default GeocodeQueryModal;
