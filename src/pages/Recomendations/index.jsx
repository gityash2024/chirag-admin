import React, { useState } from "react";
import styled from "styled-components";
import image1 from "../../assets/recommendation-1.png";
import image2 from "../../assets/recommendation-2.png";
import image3 from "../../assets/recommendation-3.png";
import image4 from "../../assets/recommendation-4.png";
import image5 from "../../assets/recommendation-5.png";
import { FaCheck } from 'react-icons/fa';
import image6 from "../../assets/recommendation-6.png";
import image7 from "../../assets/recommendation-7.png";
import image8 from "../../assets/recommendation-8.png";
import riceImage from "../../assets/rice.png";
import maizeImage from "../../assets/maize.png";
import groundnutImage from "../../assets/groundnut.png";
import pigeonPeasImage from "../../assets/pigeon-peas.png";
import soybeanImage from "../../assets/soybean.png";
import sugarcaneImage from "../../assets/sugarcane.png";
import wheatImage from "../../assets/wheat.png";
import sesameImage from "../../assets/sesame.png";
import safflowerImage from "../../assets/safflower.png";
import cottonImage from "../../assets/cotton.png";
import tomatoImage from "../../assets/tomato.png";
import onionImage from "../../assets/onion.png";
import potatoImage from "../../assets/potato.png";
import brinjalImage from "../../assets/brinjal.png";
import mustardImage from "../../assets/mustard.png";
import moongDalImage from "../../assets/moong-dal.png";
import arharDalImage from "../../assets/arhar-dal.png";
import chilliImage from "../../assets/chilli.png";
import mangoImage from "../../assets/mango.png";
import papayaImage from "../../assets/papaya.png";
import appleImage from "../../assets/apple.png";
import litchiImage from "../../assets/litchi.png";
import { toast } from "react-toastify";
const Container = styled.div`
  padding: 20px;
  font-family: "Public Sans", sans-serif;
  position: relative;
  z-index: 1;
`;
const CropCard = styled.div`
  border: 1px solid #EEEEEE;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  ${props => props.selected && `
    border-color: #000000;
  `}
`;

const CheckIcon = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000000;
  display: ${props => props.visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 12px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
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
  background: linear-gradient(160.06deg, #34C487 1.81%, #083C88 98.19%);
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

const CropGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-bottom: 20px;
`;



const CropImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const CropName = styled.p`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
`;

const Recommendations = () => {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleViewRecommendations = () => {
    if(!selectedCrop){
      toast.info('Please select a crop');
      return
    }
    setShowRecommendations(true);
  };

  const handleDone = () => {
    setShowRecommendations(false);
    setIsChecked(false);
  };

  const cropList = [
    { name: "Rice", image: riceImage },
    { name: "Maize", image: maizeImage },
    { name: "Groundnut", image: groundnutImage },
    { name: "Pigeon pea", image: pigeonPeasImage },
    { name: "Soybean", image: soybeanImage },
    { name: "Sugarcane", image: sugarcaneImage },
    { name: "Wheat", image: wheatImage },
    { name: "Sesame", image: sesameImage },
    { name: "Safflower", image: safflowerImage },
    { name: "Cotton", image: cottonImage },
    { name: "Tomato", image: tomatoImage },
    { name: "Onion", image: onionImage },
    { name: "Potato", image: potatoImage },
    { name: "Brinjal", image: brinjalImage },
    { name: "Mustard", image: mustardImage },
    { name: "Moong Dal", image: moongDalImage },
    { name: "Arhar Dal", image: arharDalImage },
    { name: "Chilli", image: chilliImage },
    { name: "Mango", image: mangoImage },
    { name: "Papaya", image: papayaImage },
    { name: "Apple", image: appleImage },
    { name: "Litchi", image: litchiImage }
  ];
  

  const renderInitialScreen = () => (
    <>
      <Title>Spray Guide</Title>
      <p style={{ marginBottom: "20px" }}>Please select the crop</p>
      <CropGrid>
        {cropList.map((crop, index) => (
        <CropCard
        key={index}
        selected={selectedCrop === crop.name}
        onClick={() => setSelectedCrop(crop.name)}
      >
        <CheckIcon visible={selectedCrop === crop.name}>
          <FaCheck />
        </CheckIcon>
        <CropImage src={crop.image} alt={crop.name} />
        <CropName>{crop.name}</CropName>
      </CropCard>
        ))}
      </CropGrid>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>

      <Button style={{disabled: !selectedCrop,cursor: !selectedCrop ? "not-allowed" : "pointer",width:"200px"}} onClick={handleViewRecommendations}>Next</Button>
      </div>
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