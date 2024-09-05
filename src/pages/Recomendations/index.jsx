import React, { useState } from "react";
import styled from "styled-components";
import image1 from "../../assets/recommendation-1.png";
import image2 from "../../assets/recommendation-2.png";
import image3 from "../../assets/recommendation-3.png";
import image4 from "../../assets/recommendation-4.png";
import image5 from "../../assets/recommendation-5.png";
import image6 from "../../assets/recommendation-6.png";
import image7 from "../../assets/recommendation-7.png";
import image8 from "../../assets/recommendation-8.png";

const Container = styled.div`
  padding: 20px;
  font-family: "Public Sans", sans-serif;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CardImageContainer = styled.div`
  width: 100px;
  background: linear-gradient(160.06deg, #71A27C 1.81%, #003F17 98.19%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled.img`
  width: 60px;
  height: 60px;
`;

const CardContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;

const WarningContainer = styled.div`
  margin-top: 20px;
  color: #DE0000;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const DoneButton = styled(Button)`
  margin-top: 20px;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;

const Recommendations = () => {
  const [selectedCrop, setSelectedCrop] = useState("Maize");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleViewRecommendations = () => {
    setShowRecommendations(true);
  };

  const handleDone = () => {
    setShowRecommendations(false);
    setIsChecked(false);
  };

  const renderInitialScreen = () => (
    <>
      <Title>Recommendation</Title>
      <Select value={selectedCrop} onChange={(e) => setSelectedCrop(e.target.value)}>
        <option value="Maize">Maize</option>
      </Select>
      <Button onClick={handleViewRecommendations}>View Recommendation</Button>
    </>
  );

  const renderRecommendations = () => (
    <>
      <Title>Recommendation for "{selectedCrop}"</Title>
      <p>Please read the Recommendation carefully!</p>
      <CardContainer>
        {recommendationData.map((item, index) => (
          <Card key={index}>
            <CardImageContainer>
              <CardImage src={item.image} alt={item.title} />
            </CardImageContainer>
            <CardContent>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.content}</CardText>
            </CardContent>
          </Card>
        ))}
      </CardContainer>
      <WarningContainer>
        <p>As the larvae of Army worm are active at night, spraying in the evening is more advantageous.</p>
        <p>Spraying chemical insecticides early in the crop cycle are most likely to kill off the natural enemies and may not be economical.</p>
        <p>Precautions for pesticide use: Not more than two chemical sprays are to be used in entire crop duration. Same chemical should not be chosen for second spray. Sprays should always be directed towards whorl and applied either in early hours of the day or in the evening time.</p>
      </WarningContainer>
      <CheckboxContainer>
        <Checkbox type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        <label>I have read all the recommendations carefully.</label>
      </CheckboxContainer>
      <DoneButton onClick={handleDone} disabled={!isChecked}>Done</DoneButton>
    </>
  );

  return (
    <Container>
      {showRecommendations ? renderRecommendations() : renderInitialScreen()}
    </Container>
  );
};

const recommendationData = [
  {
    title: "DRONE FLYING SPEED",
    content: "During Spraying: (4.5-5.0)\nDuring Turning RTL etc: <5.5",
    image: image1,
  },
  {
    title: "HEIGHT ABOVE CROP CANOPY (m)",
    content: "During Spraying: (4.5-5.0)\nDuring Turning RTL etc: <5.5",
    image: image2,
  },
  {
    title: "WATER VOLUME (L/HA)",
    content: "Stage 1: Early stage\n20\nFull canopy stage:\n25",
    image: image3,
  },
  {
    title: "NOZZLE",
    content: "Type of nozzle: Anti Drift fan\nDroplet size (μm) Insecticide: 250-350\nDroplet size (μm) Fungicide: 250-350\nNozzle discharge rate (l/min): 0.8-1.0\nMesh: 50-100\nSwath (m): 3-4\nNumber of Nozzles: 4-8\nPressure (bar): 2-3",
    image: image4,
  },
  {
    title: "SUITABLE TIME OF SPRAY",
    content: "Summer & rainy season: 6am-10am & 3pm-6pm\nWinter season: 8am-11am & 2pm-5pm\nStrictly avoid spraying during flowering season (8am - 5pm)",
    image: image5,
  },
  {
    title: "ENVIRONMENTAL CONDITIONS",
    content: "Temperature: <35°C\nHumidity: >60%\nWind Speed: <10km/h\nDuring Rain: Do not Spray\nDo not operate if visibility during mist/fog is not good",
    image: image6,
  },
  {
    title: "SITE SPECIFIC",
    content: "Plain land: take care of obstacles present in field: Yes\nSloppy terrain: Use terrain following sensors: Yes\nDo not operate if visibility during mist/fog is not good",
    image: image7,
  },
  {
    title: "LENGTH OF BUFFER ZONE (M) TO AVOID",
    content: "Non-targeted Crops: 5\nWater bodies etc: 100",
    image: image8,
  },
];

export default Recommendations;